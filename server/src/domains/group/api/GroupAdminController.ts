import { Controller, Get, Param, Patch, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { GroupService } from '../service/GroupService';
import { GroupApplyResponse } from '../dto/GroupApplyResponse';
import { SimpleGroupInfoResponse } from '../dto/SimpleGroupInfoResponse';
import { isLoggedIn } from '@common/middleware/isLoggedIn';

@OpenAPI({
  tags: ['그룹 설정'],
})
@Service()
@Controller('/group/admin')
export class GroupAdminController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
  ) {}

  @OpenAPI({ summary: '그룹정보를 가져오는 API' })
  @ResponseSchema(SimpleGroupInfoResponse)
  @UseBefore(isLoggedIn)
  @Get('/:gid')
  public async getGroupInfo(@Param('gid') groupId: number) {
    return await this.groupService.getSimpleGroupInfoByGroupId(groupId);
  }

  @OpenAPI({ summary: '그룹참가 요청 리스트를 가져오는 API' })
  @ResponseSchema(GroupApplyResponse, { isArray: true })
  @UseBefore(isLoggedIn)
  @Get('/apply/:gid')
  public async getApplyList(@Param('gid') groupId: number) {
    return await this.groupService.getApplyListByGroupId(groupId);
  }
}
