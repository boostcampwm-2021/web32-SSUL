import { Inject, Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ApplyGroupRepository } from '../repository/ApplyGroupRepository';
import { NotAuthorizedError } from '@common/error/NotAuthorizedError';
import { GroupService } from './GroupService';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';
import { ApplyGroup, ApplyGroupState } from '../models/ApplyGroup';
import { SimpleGroupInfoResponse } from '../dto/response/SimpleGroupInfoResponse';
import { GroupApplyResponse } from '../dto/response/GroupApplyResponse';

@Service()
export class GroupOwnerService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly applyGroupRepository: ApplyGroupRepository,
    @Inject()
    private readonly groupService: GroupService,
  ) {}

  public async getGroupInfo(gid: number): Promise<SimpleGroupInfoResponse> {
    const group = await this.groupRepository.findOneOrFailById(gid);
    return SimpleGroupInfoResponse.from(group);
  }

  public async getApplyList(gid: number): Promise<GroupApplyResponse[]> {
    const applyGroupList = await this.applyGroupRepository.findAllByGroupIdAndState(
      gid,
      ApplyGroupState.PENDING,
    );
    return applyGroupList.map((applyGroup) => GroupApplyResponse.from(applyGroup));
  }

  public updateGroupName(gid: number, name: string) {
    return this.groupRepository.update({ id: gid }, { name });
  }

  public updateGroupDate(gid: number, startAt: string, endAt: string) {
    return this.groupRepository.update({ id: gid }, { startAt, endAt });
  }

  public updateGroupIntro(gid: number, intro: string) {
    return this.groupRepository.update({ id: gid }, { intro });
  }

  public async acceptRequest(applyId: number, ownerId: number): Promise<ApplyGroup> {
    const applyGroup = await this.applyGroupRepository.findOneOrFailById(applyId);

    if (applyGroup.group.ownerId !== ownerId) {
      throw new NotAuthorizedError();
    }

    applyGroup.state = ApplyGroupState.ACCEPTED;
    await this.groupService.enroll(applyGroup.groupId, applyGroup.userId, GroupEnrollmentAs.MENTEE);
    await this.applyGroupRepository.save(applyGroup);
    return applyGroup;
  }

  public async declineRequest(applyId: number, ownerId: number): Promise<ApplyGroup> {
    const applyGroup = await this.applyGroupRepository.findOneOrFailById(applyId);

    if (applyGroup.group.ownerId !== ownerId) {
      throw new NotAuthorizedError();
    }
    applyGroup.state = ApplyGroupState.DECLINED;
    await this.applyGroupRepository.save(applyGroup);
    return applyGroup;
  }
}
