import {
  Body,
  Controller,
  Get,
  OnUndefined,
  Param,
  Params,
  Post,
  QueryParams,
  Session,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';

import { GroupService } from '../service/GroupService';
import { AlarmService } from '@domains/alarm/service/AlarmService';

import { AlarmDto } from '@domains/alarm/dto/AlarmDto';
import { AlarmType } from '@domains/alarm/models/Alarm';
import { FilteredPageGroupResponse } from '../dto/response/FilteredPageGroupResponse';
import { GroupQuery } from '../dto/query/GroupQuery';
import { GroupActivityResponse } from '../dto/response/GroupActivityResponse';
import { CreateGroupDto } from '../dto/request/CreateGroupDto';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { OwnerGroupCardResponse } from '../dto/response/OwnerGroupCardResponse';
import { SimpleGroupCardResponse } from '../dto/response/SimpleGroupCardResponse';
import { ApplyedGroupQuery } from '../dto/query/ApplyedGroupQuery';
import { EnrolledGroupQuery } from '../dto/query/EnrolledGroupQuery';
import { GroupDetailResponse } from '../dto/response/GroupDetailResponse';
import { ApplyGroupDto } from '../dto/request/ApplyGroupDto';
import { GroupRoleResponse } from '../dto/response/GroupRoleResponse';
import { GroupParam } from '../dto/param/GroupParam';

@OpenAPI({
  tags: ['그룹'],
})
@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly alarmService: AlarmService,
  ) {}

  @Get('/')
  @OnUndefined(200)
  @OpenAPI({
    summary: '필터링된 그룹을 조회하는 API',
    responses: {
      '200': {
        description: '그룹 조회 완료',
      },
    },
  })
  @ResponseSchema(FilteredPageGroupResponse, { description: '필터링 그룹 조회 결과' })
  async getAll(@QueryParams() { page, name, category, techstack }: GroupQuery) {
    const filteredGroups = await this.groupService.getfilteredPageGroups(
      page,
      name,
      category,
      techstack,
    );
    return filteredGroups;
  }

  @Post('/')
  @OnUndefined(200)
  @OpenAPI({
    summary: '그룹을 생성하는 API',
  })
  async create(@Body() createGroupDto: CreateGroupDto) {
    await this.groupService.createGroup(createGroupDto);
  }

  @OpenAPI({ summary: '그룹활동 리스트를 가져오는 API' })
  @ResponseSchema(GroupActivityResponse, { isArray: true })
  @Get('/activity/:uid')
  public async getGroupActivity(@Param('uid') userId: number) {
    return await this.groupService.getEndGroupList(userId);
  }

  @Get('/own')
  @UseBefore(isLoggedIn)
  @ResponseSchema(OwnerGroupCardResponse, { isArray: true })
  @OpenAPI({ summary: '내가 만든 그룹 목록을 가져오는 API' })
  public async getMyGroups(@Session() session: any) {
    return await this.groupService.getOwnGroups(session.user.id);
  }

  @Get('/own/simple')
  @UseBefore(isLoggedIn)
  @ResponseSchema(SimpleGroupCardResponse, { isArray: true })
  @OpenAPI({ summary: '내가 만든 그룹 목록을 간단한 내용만 가져오는 API' })
  public async getMySimpleGroups(@Session() session: any) {
    return await this.groupService.getOwnSimpleGroups(session.user.id);
  }

  @Get('/applyed')
  @UseBefore(isLoggedIn)
  @ResponseSchema(SimpleGroupCardResponse, { isArray: true })
  @OpenAPI({ summary: '내가 가입 신청한 그룹 목록을 신청 상태에 따라 가져오는 API' })
  public async getMyApplyedGroups(
    @Session() session: any,
    @QueryParams() { state }: ApplyedGroupQuery,
  ) {
    return await this.groupService.getMyApplyedGroups(session.user.id, state);
  }

  //TODO: need unit test
  @Get('/my')
  @UseBefore(isLoggedIn)
  @ResponseSchema(SimpleGroupCardResponse, { isArray: true })
  @OpenAPI({
    summary: '내가 참여한 그룹을 상태에따라 필터링하여 가져오는 API',
  })
  public async getEnrolledGroupByStatus(
    @Session() session: any,
    @QueryParams() { status, type }: EnrolledGroupQuery,
  ) {
    return await this.groupService.getEnrolledGroupByQuery(session.user.id, status, type);
  }

  @Post('/apply')
  @OnUndefined(200)
  @OpenAPI({
    summary: '그룹 가입 신청 넣는 API',
  })
  async applyGroup(@Body() { groupId, userId }: ApplyGroupDto) {
    await this.groupService.checkApplyGroup(groupId, userId);
    const applyGroup = await this.groupService.addApplyGroup(groupId, userId);
    await this.alarmService.postAlarm(AlarmDto.fromApply(applyGroup, AlarmType.JOIN_GROUP_REQUEST));
  }

  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({
    summary: '유저가 그룹에서 어떤 역할인지 가져오는 API',
  })
  @ResponseSchema(GroupRoleResponse)
  @Get('/role/:gid')
  public async getGroupEnroll(@Session() session: any, @Params() { gid: groupId }: GroupParam) {
    const { id: userId } = session.user;
    return await this.groupService.getGroupRole(groupId, userId);
  }

  @Get('/:gid')
  @OpenAPI({ summary: '그룹 정보를 가져오는 API' })
  @ResponseSchema(GroupDetailResponse, { description: '그룹 정보 조회 완료' })
  async getGroupData(@Param('gid') gid: number) {
    return await this.groupService.getGroupDetail(gid);
  }
}
