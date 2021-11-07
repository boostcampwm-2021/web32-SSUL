import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from "@domains/category/models/Category";
import { CategoryRepository } from "@domains/category/repository/CategoryRepository";
import { CreateGroupDto } from "../dto/CreateGroupDto";
import { Group } from "../models/Group";

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
  ) {}

  public async getGroups() {
    const groups = await this.groupRepository.findAll();
    return groups;
  }

    public async createGroup(groupData: CreateGroupDto) {
        const group: Group = new Group();
        
        group.mentorId = 0;
        group.ownerId = groupData.ownerId;
        group.name = groupData.name;
        group.maxUserCnt = groupData.maxUserCnt;
        group.curUserCnt = groupData.curUserCnt;
        group.intro = groupData.intro;
        group.startAt = new Date(groupData.startAt);
        group.endAt = new Date(groupData.endAt);


        return this.groupRepository.createGroup(group);
    }
}