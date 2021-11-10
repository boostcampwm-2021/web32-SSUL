import { UsingTechStackService } from '@domains/techstack/service/UsingTechStackService';
import { ProfileService } from '@domains/user/service/ProfileService';
import { Body, Controller, Get, OnUndefined, Post, QueryParam } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupService } from '../service/GroupService';
import { Group } from '../models/Group';

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
  async getAll(
    @QueryParam('name') name: string,
    @QueryParam('category') category: string,
    @QueryParam('techstack') techstack: string,
  ) {
    const groups: Group[] = await this.groupService.getGroups(name, category);
    const addedOtherGroupInfo = await this.addOtherGroupInfo(groups);
    return addedOtherGroupInfo;
  }

  @Post('/create')
  @OnUndefined(200)
  async create(@Body() groupData: CreateGroupDto) {
    const createdGroup = await this.groupService.createGroup(groupData);
    this.usingTechStackService.createGroupUsingStack(createdGroup, groupData.usingTechStacks);
  }

  addOtherGroupInfo(groups: Group[]) {
    return Promise.all(
      groups.map(async (group: Group) => {
        const techStackList = await this.usingTechStackService.getGroupsTechStackList(group.id);
        const [ownerFeverStack, ownerName] = await this.profileService.getGroupOwnerInfo(
          group.ownerId,
        );
        return { ...group, techStackList, ownerFeverStack, ownerName };
      }),
    );
  }
}
