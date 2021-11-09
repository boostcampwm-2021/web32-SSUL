import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from "@domains/category/models/Category";
import { CategoryRepository } from "@domains/category/repository/CategoryRepository";
import { CreateGroupDto } from "../dto/CreateGroupDto";
import { Group } from "../models/Group";
import { TechStack } from '@domains/techstack/models/TechStack';
import { UsingTechAs, UsingTechStack } from '@domains/techstack/models/UsingTechStack';
import { TechStackRepository } from '@domains/techstack/repository/TechStackRepository';
import { UsingTechStackRepository } from '@domains/techstack/repository/UsingTechStackRepository';

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async getGroups() {
    const groups = await this.groupRepository.findAll();
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
