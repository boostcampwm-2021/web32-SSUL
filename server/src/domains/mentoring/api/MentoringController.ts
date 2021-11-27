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
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { MentorInfoDto } from '../dto/MentorInfoDto';
import { MentoringRequestListDto, MentoringRequestParam } from '../dto/MentoringRequestListDto';
import { RegisterMentoDto } from '../dto/RegisterMentoDto';
import { MentoringService } from '../service/MentoringService';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { NotAuthorizedError } from '@error/NotAuthorizedError';
import { AcceptRequestDto } from '../dto/AcceptRequestDto';
import { GroupEnrollmentAs } from '@domains/group/models/GroupEnrollment';
import { GroupService } from '@domains/group/service/GroupService';
import { TechStackService } from '@domains/techstack/service/TechStackService';
import { UserService } from '@domains/user/service/UserService';
import {
  FilterdPageMentorListParams,
  FilterdPageMentorListResponse,
} from '../dto/FilterdPageMentorListResponse';
import { MentoringRequestResponse } from '../dto/MentoringRequestResponse';
import { PostRequestDto } from '../dto/PostRequestDto';

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
    private readonly userService: UserService,
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
  @ResponseSchema(FilterdPageMentorListResponse)
  public async getFilterdMentorList(
    @QueryParams() { page, name, techstack }: FilterdPageMentorListParams,
  ) {
    return await this.mentoringService.getFilterdPageMentorList(page, name, techstack);
  }

  @Get('/mentor/:uid')
  @OpenAPI({ summary: '멘토 id를 가져오는 API' })
  @ResponseSchema(MentorInfoDto)
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
  @ResponseSchema(MentoringRequestResponse, { isArray: true })
  public async getAllMentoringRequest() {
    return await this.mentoringService.getAllRequestList();
  }

  @Post('/request')
  @OpenAPI({ summary: '멘토링 요청을 보내는 API' })
  @OnUndefined(200)
  public async postMentoringRequest(@Body() { mentorId, groupId }: PostRequestDto) {
    return await this.mentoringService.saveMentoringRequest(mentorId, groupId);
  }

  @Get('/request/:mid')
  @OpenAPI({ summary: '특정 멘토의 멘토링 요청 리스트를 가져오는 API' })
  @ResponseSchema(MentoringRequestListDto)
  public async getRequest(@Params() { mid: mentorId }: MentoringRequestParam) {
    return await this.mentoringService.getRequestListByMentorId(mentorId);
  }

  @Post('/request/reject/:id')
  @OpenAPI({ summary: '멘토링 요청을 거절하는 API' })
  @OnUndefined(200)
  public async rejectRequest(@Param('id') requestId: number) {
    await this.mentoringService.deleteRequest(requestId);
  }

  @Post('/request/accept')
  @OpenAPI({ summary: '멘토링 요청을 수락하는 API' })
  @OnUndefined(200)
  public async acceptRequest(@Body() { id, groupId, userId }: AcceptRequestDto) {
    const { mentorId } = await this.mentoringService.getMentorIdByUserId(userId);
    await this.groupService.addGroupMentor(mentorId, groupId);
    await this.groupService.enroll(groupId, userId, GroupEnrollmentAs.MENTOR);
    await this.mentoringService.deleteRequest(id);
  }
}
