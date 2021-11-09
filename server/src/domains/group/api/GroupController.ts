import { UsingTechStackService } from '@domains/techstack/service/UsingTechStackService';
import { ProfileService } from '@domains/user/service/ProfileService';
import { TechStackService } from '@domains/techstack/service/TechStackService';
import { Body, Controller, OnUndefined, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Group } from '../dto/groupDto';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupService } from '../service/GroupService';

@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly usingTechStackService: UsingTechStackService,
    @Inject()
    private readonly profileService: ProfileService,
  ) {}

  @Get('/')
  async getAll() {
    const addedOtherGroupInfo = await this.addOtherGroupInfo(groups);
    const groups: Group[] = await this.groupService.getGroups();
    return addedOtherGroupInfo;
  }

  @Post('/create')
  @OnUndefined(200)
  async create(@Body() groupData: CreateGroupDto) {
    const createdGroup = await this.groupService.createGroup(groupData);
    this.techStackService.createGroupUsingStack(createdGroup, groupData.usingTechStacks);
  }

  addOtherGroupInfo(groups: Group[]) {
    return Promise.all(
      groups.map(async (group: Group) => {
        const techStackList = await this.usingTechStackService.getGroupsTechStackList(group.id);
        const ownerFeverStack = await this.profileService.getUserFeverStack(group.ownerId);
        return { ...group, techStackList, ownerFeverStack };
      }),
    );
  }
}
