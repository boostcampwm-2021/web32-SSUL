import {
  Session,
  Controller,
  OnUndefined,
  Body,
  Post,
  Get,
  Param,
  UseBefore,
  QueryParams,
  Params,
  Delete,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { MentoringService } from '../service/MentoringService';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { NotAuthorizedError } from '@error/NotAuthorizedError';
import { GroupEnrollmentAs } from '@domains/group/models/GroupEnrollment';
import { GroupService } from '@domains/group/service/GroupService';
import { TechStackService } from '@domains/techstack/service/TechStackService';
import { AlarmService } from '@domains/alarm/service/AlarmService';
import { AlarmDto } from '@domains/alarm/dto/AlarmDto';
import { AlarmType } from '@domains/alarm/models/Alarm';
import { FilteredMentorPageResponse } from '../dto/response/FilteredMentorPageResponse';
import { FilteredMentorPageQuery } from '../dto/query/FilteredMentorPageQuery';
import { MentorInfoResponse } from '../dto/response/MentorInfoResponse';
import { RegisterMentoDto } from '../dto/request/RegisterMentoDto';
import { AllMentoringRequestResponse } from '../dto/response/AllMentoringRequestResponse';
import { MentoringRequestDto } from '../dto/request/MentoringRequestDto';
import { MentoringCancelParam } from '../dto/param/MentoringCancelParam';
import { MentoringRequestParam } from '../dto/param/MentoringRequestParam';
import { MentoringRequestResponse } from '../dto/response/MentoringRequestResponse';
import { MentoringRejectParam } from '../dto/param/MentoringRejectParam';
import { AcceptRequestDto } from '../dto/request/AcceptRequestDto';

@OpenAPI({
  tags: ['멘토링'],
})
@Service()
@Controller('/mentoring')
export class MentoringController {
  constructor(
    @Inject()
    private readonly mentoringService: MentoringService,
    @Inject()
    private readonly techStackService: TechStackService,
    @Inject()
    private readonly alarmService: AlarmService,
    @Inject()
    private readonly groupService: GroupService,
  ) {}

  @Get('/mentor/list')
  @OnUndefined(200)
  @OpenAPI({
    summary: '필터링된 멘토 리스트를 가져오는 API',
    responses: {
      '200': {
        description: '그룹 조회 완료',
      },
    },
  })
  @ResponseSchema(FilteredMentorPageResponse)
  public async getfilteredMentorList(
    @QueryParams() { page, name, techstack }: FilteredMentorPageQuery,
  ) {
    return await this.mentoringService.getfilteredPageMentorList(page, name, techstack);
  }

  @Get('/mentor/:uid')
  @OpenAPI({ summary: '멘토 id를 가져오는 API' })
  @ResponseSchema(MentorInfoResponse)
  public async getMentorId(@Param('uid') userId: number) {
    return await this.mentoringService.getMentorIdByUserId(userId);
  }

  @Post('/mentor')
  @OpenAPI({ summary: '멘토를 생성하는 API' })
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  public async registerMentor(
    @Session() session: any,
    @Body() { userId, techStacks }: RegisterMentoDto,
  ) {
    if (session.user.id !== userId) {
      throw new NotAuthorizedError();
    }
    //TODO: using TechStack.id instead of Techstack.name
    await this.mentoringService.createMentor(userId);
    const { mentorId } = await this.mentoringService.getMentorIdByUserId(userId);
    await this.techStackService.createMentorTechStack(mentorId, techStacks);
  }

  @Get('/request')
  @OpenAPI({ summary: '모든 멘토링 요청 리스트를 가져오는 API' })
  @ResponseSchema(AllMentoringRequestResponse, { isArray: true })
  public async getAllMentoringRequest() {
    return await this.mentoringService.getAllRequestList();
  }

  @Post('/request')
  @UseBefore(isLoggedIn)
  @OpenAPI({ summary: '멘토링 요청을 보내는 API' })
  @OnUndefined(200)
  public async postMentoringRequest(@Body() { mentorId, groupId }: MentoringRequestDto) {
    const mentoringRequest = await this.mentoringService.saveMentoringRequest(mentorId, groupId);
    await this.alarmService.postAlarm(
      AlarmDto.fromMentoringRequest(mentoringRequest, AlarmType.MENTORING_REQUEST),
    );
  }

  @Delete('/request')
  @UseBefore(isLoggedIn)
  @OpenAPI({ summary: '멘토링 요청을 취소하는 API' })
  @OnUndefined(204)
  public async deleteRequest(
    @QueryParams() { mentor: mentorId, group: groupId }: MentoringCancelParam,
  ) {
    await this.mentoringService.cancelMentoringRequest(mentorId, groupId);
  }

  @Get('/request/:mid')
  @OpenAPI({ summary: '특정 멘토의 멘토링 요청 리스트를 가져오는 API' })
  @ResponseSchema(MentoringRequestResponse, { isArray: true })
  public async getRequest(@Params() { mid: mentorId }: MentoringRequestParam) {
    return await this.mentoringService.getRequestListByMentorId(mentorId);
  }

  @Post('/request/reject/:id')
  @OpenAPI({ summary: '멘토링 요청을 거절하는 API' })
  @OnUndefined(200)
  public async rejectRequest(@Params() { id: requestId }: MentoringRejectParam) {
    const mentoringRequest = await this.mentoringService.deleteRequest(requestId);
    await this.alarmService.postAlarm(
      AlarmDto.fromMentoringRequest(mentoringRequest, AlarmType.METTORING_DECLIEND),
    );
  }

  @Post('/request/accept')
  @OpenAPI({ summary: '멘토링 요청을 수락하는 API' })
  @OnUndefined(200)
  public async acceptRequest(@Body() { id, groupId, userId }: AcceptRequestDto) {
    const { mentorId } = await this.mentoringService.getMentorIdByUserId(userId);
    await this.groupService.addGroupMentor(mentorId, groupId);
    const group = await this.groupService.enroll(groupId, userId, GroupEnrollmentAs.MENTOR);
    await this.mentoringService.deleteRequest(id);
    await this.alarmService.postAlarm(AlarmDto.fromGroup(group, AlarmType.MENTORING_ACCEPTED));
  }
}
