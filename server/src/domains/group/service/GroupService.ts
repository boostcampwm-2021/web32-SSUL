import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from '@domains/category/models/Category';
import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { Group } from '../models/Group';
import { UsingTechStackRepository } from '@domains/techstack/repository/UsingTechStackRepository';
import { ProfileRepository } from '@domains/user/repository/ProfileRepository';
import { FilterdGroupDto, FilterdPageGroupDto } from '../dto/FilterdGroupDto';

const EACH_PAGE_CNT = 12;

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
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async getFilterdPageGroups(
    page: number = 1,
    name: string = '',
    category: number,
    techstack: string,
  ): Promise<FilterdPageGroupDto> {
    const totalFilterdGroups = await this.getFilterdGroups(name, category, techstack);
    const offset = (page - 1) * EACH_PAGE_CNT;
    const filterdPageGroups = totalFilterdGroups.slice(offset, offset + EACH_PAGE_CNT);
    const totalPages: number = Math.ceil(totalFilterdGroups.length / EACH_PAGE_CNT);

    return { groups: filterdPageGroups, totalPages };
  }

  public async getFilterdGroups(
    name: string,
    category: number,
    techstack: string,
  ): Promise<FilterdGroupDto[]> {
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
          const [ownerName, ownerFeverStack, ownerAvatarUrl] =
            await this.profilekRepository.findOwnerInfoByUserId(group.ownerId);
          return { ...group, techStackList, ownerName, ownerFeverStack, ownerAvatarUrl };
        }
      }),
    ).then((data) => data.filter((group) => group !== undefined));
  }

  public async createGroup(groupData: CreateGroupDto) {
    const category: Category = await this.categoryRepository.findOneOrFail({
      where: { name: groupData.category },
    });
    const group: Group = groupData.toEntity(category);
    const createdGroup = await this.groupRepository.createGroup(group);

    return createdGroup;
  }

  public async getEndGroupList(userId: number) {
    const res = await this.groupRepository.findEndGroupByUserId(userId);

    return res.map(({ name, startAt, endAt }) => {
      return { name, startAt, endAt };
    });
  }
}
