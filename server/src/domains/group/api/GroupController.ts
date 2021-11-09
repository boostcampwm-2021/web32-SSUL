import { TechStackService } from '@domains/techstack/service/TechStackService';
import { ProfileService } from '@domains/user/service/ProfileService';
import { Controller, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { GroupService } from '../service/GroupService';

@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly techStackService: TechStackService,
    @Inject()
    private readonly profileService: ProfileService,
  ) {}

  @Get('/')
  async getAll() {
    const groups: any = await this.groupService.getGroups();
    const addedOtherGroupInfo = await this.addOtherGroupInfo(groups);
    return addedOtherGroupInfo;
  }

  addOtherGroupInfo(groups: any) {
    return Promise.all(
      groups.map(async (group: any) => {
        const techStackList = await this.techStackService.getGroupsTechStackList(group.id);
        const ownerFeverStack = await this.profileService.getUserFeverStack(group.onwerId);
        return { ...group, techStackList, ownerFeverStack };
      }),
    );
  }
}
