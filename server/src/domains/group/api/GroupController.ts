import { Controller, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { GroupService } from '../service/GroupService';

@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
  ) {}

  @Get('/')
  getAll() {
    const groups = this.groupService.getGroups();
    return groups;
  }
}
