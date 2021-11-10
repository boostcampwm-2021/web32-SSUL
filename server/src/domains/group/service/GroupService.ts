import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from '@domains/category/models/Category';
import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { Group } from '../models/Group';

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async getGroups(name: string = '', category: string = '') {
    const categoryRecord = await this.categoryRepository.findOneByCategoryName(category);
    const groups = await this.groupRepository.findGroupByNameAndCategory(name, categoryRecord?.id);
    return groups;
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
