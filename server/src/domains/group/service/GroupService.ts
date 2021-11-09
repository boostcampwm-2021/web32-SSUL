import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TechStackRepository } from '@domains/techstack/repository/TechStackRepository';

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
  ) {}

  public async getGroups() {
    const groups = await this.groupRepository.findAll();
    const repackGroupInfo = await Promise.all(
      groups.map(async (group) => {
        const groupsTechStackList = await this.techStackRepository.findTechStackListByGroupId(
          group.id,
        );
        return { ...group, teckStack: groupsTechStackList };
      }),
    );
    return repackGroupInfo;
  }
}
