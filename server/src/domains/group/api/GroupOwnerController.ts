import {
  Body,
  Controller,
  Get,
  OnUndefined,
  Param,
  Patch,
  Session,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { GroupApplyResponse } from '../dto/GroupApplyResponse';
import { SimpleGroupInfoResponse } from '../dto/SimpleGroupInfoResponse';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { GroupOwnerService } from '../service/GroupOwnerService';
import { UpdateGroupDateDto, UpdateGroupIntroDto, UpdateGroupNameDto } from '../dto/UpdateGroupDto';
import { GroupService } from '../service/GroupService';
import { GroupParam } from '../dto/groupDto';
import { ApplyParam } from '../dto/ApplyGroupDto';

@OpenAPI({
  tags: ['그룹 설정'],
})
@Service()
@Controller('/group-owner')
export class GroupOwnerController {
  constructor(
    @Inject()
    private readonly groupOwnerService: GroupOwnerService,
    @Inject()
    private readonly groupService: GroupService,
  ) {}

  @OpenAPI({ summary: '그룹정보를 가져오는 API' })
  @ResponseSchema(SimpleGroupInfoResponse)
  @UseBefore(isLoggedIn)
  @Get('/:gid')
  public async getGroupInfo(@Session() session: any, @Param('gid') { gid }: GroupParam) {
    await this.groupService.checkGroupOwner(gid, session.user.id);
    return await this.groupOwnerService.getGroupInfoByGroupId(gid);
  }

  @OpenAPI({ summary: '그룹참가 요청 리스트를 가져오는 API' })
  @ResponseSchema(GroupApplyResponse, { isArray: true })
  @UseBefore(isLoggedIn)
  @Get('/apply/:gid')
  public async getApplyList(@Session() session: any, @Param('gid') { gid }: GroupParam) {
    await this.groupService.checkGroupOwner(gid, session.user.id);
    return await this.groupOwnerService.getApplyListByGroupId(gid);
  }

  @OpenAPI({ summary: '그룹의 제목을 변경하는 API' })
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @Patch('/name')
  public async updateTitle(@Session() session: any, @Body() { gid, name }: UpdateGroupNameDto) {
    await this.groupService.checkGroupOwner(gid, session.user.id);
    await this.groupOwnerService.updateGroupName(gid, name);
  }

  @OpenAPI({ summary: '그룹의 시작/종료일을 변경하는 API' })
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @Patch('/date')
  public async updateDate(
    @Session() session: any,
    @Body() { gid, startAt, endAt }: UpdateGroupDateDto,
  ) {
    await this.groupService.checkGroupOwner(gid, session.user.id);
    await this.groupOwnerService.updateGroupDate(gid, startAt, endAt);
  }

  @OpenAPI({ summary: '그룹의 소개글을 변경하는 API' })
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @Patch('/intro')
  public async updateIntro(@Session() session: any, @Body() { gid, intro }: UpdateGroupIntroDto) {
    await this.groupService.checkGroupOwner(gid, session.user.id);
    await this.groupOwnerService.updateGroupIntro(gid, intro);
  }

  @OpenAPI({ summary: '그룹의 참여 요청을 승인하는 API' })
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @Patch('/accept/:id')
  public async acceptApply(@Session() session: any, @Param('id') { aid }: ApplyParam) {
    await this.groupOwnerService.acceptRequest(aid, session.user.id);
  }

  @OpenAPI({ summary: '그룹의 참여 요청을 거절하는 API' })
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @Patch('/decline/:id')
  public async declineApply(@Session() session: any, @Param('id') { aid }: ApplyParam) {
    await this.groupOwnerService.declineRequest(aid, session.user.id);
  }
}
