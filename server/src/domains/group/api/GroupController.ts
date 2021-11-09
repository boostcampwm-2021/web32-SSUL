import { TechStackService } from '@domains/techstack/service/TechStackService';
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
  ) {}

  @Get('/')
  async getAll() {
    const groups: any = await this.groupService.getGroups();
    const addedTechStackList = await this.addTechStackList(groups);
    return addedTechStackList;
  }

  addTechStackList(groups: any) {
    console.log(groups);
    return Promise.all(
      groups.map(async (group: any) => {
        const techStackList = await this.techStackService.getGroupsTechStackList(group.id);
        return { ...group, techStackList };
      }),
    );
  }
}
