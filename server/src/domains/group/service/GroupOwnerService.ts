import { Inject, Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GroupApplyResponse } from '../dto/GroupApplyResponse';
import { ApplyGroupRepository } from '../repository/ApplyGroupRepository';
import { SimpleGroupInfoResponse } from '../dto/SimpleGroupInfoResponse';
import { NotAuthorizedError } from '@common/error/NotAuthorizedError';
import { GroupService } from './GroupService';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';
import { ApplyGroupState } from '../models/ApplyGroup';

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

  public async getGroupInfoByGroupId(gid: number): Promise<SimpleGroupInfoResponse> {
    const { name, intro, startAt, endAt } = await this.groupRepository.findOneOrFailByGroupId(gid);
    return { name, intro, startAt, endAt };
  }

  public async getApplyListByGroupId(gid: number): Promise<GroupApplyResponse[]> {
    const applyGroupList = await this.applyGroupRepository.findApplyListByGroupId(gid);
    return applyGroupList.map(({ id, createdAt, user }) => {
      return {
        id: id,
        createdAt,
        name: user.name,
        githubId: user.githubId,
        avatarUrl: user.avatarUrl,
        feverStack: user.feverStack,
      };
    });
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
  public async acceptRequest(applyId: number, ownerId: number) {
    const applyGroup = await this.applyGroupRepository.findApplyData(applyId, ownerId);

    if (applyGroup === undefined) {
      throw new NotAuthorizedError();
    }
    applyGroup.state = ApplyGroupState.ACCEPTED;
    //TODO transaction
    await this.groupService.enroll(applyGroup.groupId, applyGroup.userId, GroupEnrollmentAs.MENTEE);
    await this.applyGroupRepository.save(applyGroup);
  }

  public async declineRequest(applyId: number, ownerId: number) {
    const applyGroup = await this.applyGroupRepository.findApplyData(applyId, ownerId);

    if (applyGroup === undefined) {
      throw new NotAuthorizedError();
    }
    applyGroup.state = ApplyGroupState.DECLINED;
    await this.applyGroupRepository.save(applyGroup);
  }
}
