import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from '@domains/category/models/Category';
import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { Group } from '../models/Group';
import { UsingTechStackRepository } from '@domains/techstack/repository/UsingTechStackRepository';
import { ProfileRepository } from '@domains/user/repository/ProfileRepository';
import { FilterdGroupDto } from '../dto/FilterdGroupDto';

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository()
    private readonly usingTechStackRepository: UsingTechStackRepository,
    @InjectRepository()
    private readonly profilekRepository: ProfileRepository,
  ) {}

  public async getFilterdGroups(name: string = '', category: number, techstack: string) {
    const filterdTechStack = techstack ? techstack.split(',') : [];
    const groups =
      category !== undefined
        ? await this.groupRepository.findGroupByNameAndCategory(name, category)
        : await this.groupRepository.findGroupByName(name);
    const addedGroupsInfo: FilterdGroupDto[] = await this.addGrpupInfo(groups, filterdTechStack);
    return addedGroupsInfo;
  }

  public async addGrpupInfo(groups: Group[], filterdTechStack: string[]) {
    return Promise.all<any>(
      groups.map(async (group: Group) => {
        const techStackList = await this.usingTechStackRepository.findUsingTechStackListByGroupId(
          group.id,
        );
        const isIncludeStackList = techStackList.some((techStack) =>
          filterdTechStack.includes(techStack),
        );

        if (filterdTechStack.length === 0 || isIncludeStackList) {
          const [ownerFeverStack, ownerName] =
            await this.profilekRepository.findNameAndFeverStackByUserId(group.ownerId);
          return { ...group, techStackList, ownerFeverStack, ownerName };
        }
      }),
    ).then((data) => data.filter((group) => group !== undefined));
  }

  public async createGroup(groupData: CreateGroupDto) {
    const group: Group = new Group();
    const category: Category = await this.categoryRepository.findOneOrFail({
      where: { name: groupData.category },
    });

    group.category = category;
    group.ownerId = groupData.ownerId;
    group.name = groupData.name;
    group.maxUserCnt = groupData.maxUserCnt;
    group.curUserCnt = groupData.curUserCnt;
    group.intro = groupData.intro;
    group.startAt = new Date(groupData.startAt);
    group.endAt = new Date(groupData.endAt);

    const createdGroup = await this.groupRepository.createGroup(group);

    return createdGroup;
  }
}
