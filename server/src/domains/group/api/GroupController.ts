import { Body, Controller, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupService } from '../service/GroupService';

@Service()
@Controller('/group')
export class GroupController {
  @Inject()
  private readonly groupService: GroupService;

  @Post('/create')
  create(@Body() groupData: CreateGroupDto) {
    return this.groupService.createGroup(groupData);
  }
}
