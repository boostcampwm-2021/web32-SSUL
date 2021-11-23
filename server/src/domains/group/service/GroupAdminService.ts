import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { GroupTechStackRepository } from '@domains/techstack/repository/GroupTechStackRepository';
import { GroupApplyResponse } from '../dto/GroupApplyResponse';
import { ApplyGroupRepository } from '../repository/ApplyGroupRepository';
import { SimpleGroupInfoResponse } from '../dto/SimpleGroupInfoResponse';

@Service()
export class GroupAdminService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly groupEnrollmentRepository: GroupEnrollmentRepository,
    @InjectRepository()
    private readonly applyGroupRepository: ApplyGroupRepository,
  ) {}

  public async getSimpleGroupInfoByGroupId(gid: number): Promise<SimpleGroupInfoResponse> {
    const { name, intro, startAt, endAt } = await this.groupRepository.findOneOrFail({ id: gid });
    return { name, intro, startAt, endAt };
  }

  public async getApplyListByGroupId(gid: number): Promise<GroupApplyResponse[]> {
    const applyGroupList = await this.applyGroupRepository.findApplyListByGroupId(gid);
    return applyGroupList.map(({ createdAt, user }) => {
      return {
        createdAt,
        name: user.name,
        avatarUrl: user.avatarUrl,
        feverStack: user.feverStack,
      };
    });
  }
}
