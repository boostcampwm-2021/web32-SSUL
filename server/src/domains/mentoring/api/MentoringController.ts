import { UsingTechAs } from '@domains/techstack/models/UsingTechStack';
import { UsingTechStackService } from '@domains/techstack/service/UsingTechStackService';
import { ProfileService } from '@domains/user/service/ProfileService';
import {
  Session,
  Controller,
  OnUndefined,
  Body,
  Post,
  Get,
  Param,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { MentorInfoDto } from '../dto/MentorInfoDto';
import { MentoringRequestListDto } from '../dto/MentoringRequestListDto';
import { RegisterMentoDto } from '../dto/RegisterMentoDto';
import { MentorService } from '../service/MentorService';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { NotAuthorizedError } from '@error/NotAuthorizedError';
import { AcceptRequestDto } from '../dto/AcceptRequestDto';
import { GroupEnrollmentService } from '@domains/group/service/GroupEnrollmentService';
import { GroupEnrollmentAs } from '@domains/group/models/GroupEnrollment';
import { GroupService } from '@domains/group/service/GroupService';

@OpenAPI({
  tags: ['멘토링'],
})
@Service()
@Controller('/mentoring')
export class MentoringController {
  constructor(
    @Inject()
    private readonly mentorService: MentorService,
    @Inject()
    private readonly usingTechStackService: UsingTechStackService,
    @Inject()
    private readonly profileService: ProfileService,
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly groupEnrollmentService: GroupEnrollmentService,
  ) {}

  @Get('/mentor/:uid')
  @OpenAPI({ summary: '멘토 id를 가져오는 API' })
  @ResponseSchema(MentorInfoDto)
  public async getMentorId(@Param('uid') userId: number) {
    return await this.mentorService.getMentorIdByUserId(userId);
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
    await this.mentorService.createMentor(userId);
    const profile = await this.profileService.getUserProfile(userId);
    this.usingTechStackService.createUserTechStack(profile, UsingTechAs.MENTOR, techStacks);
  }

  @Get('/request/:mid')
  @OpenAPI({ summary: '멘토링 요청 리스트를 가져오는 API' })
  @ResponseSchema(MentoringRequestListDto)
  public async getRequest(@Param('mid') mentorId: number) {
    return await this.mentorService.getRequestListByMentorId(mentorId);
  }

  @Post('/request/reject/:id')
  @OpenAPI({ summary: '멘토링 요청을 거절하는 API' })
  @OnUndefined(200)
  public async rejectRequest(@Param('id') requestId: number) {
    await this.mentorService.deleteRequest(requestId);
  }

  @Post('/request/accept')
  @OpenAPI({ summary: '멘토링 요청을 수락하는 API' })
  @OnUndefined(200)
  public async acceptRequest(@Body() { id, groupId, userId }: AcceptRequestDto) {
    const { mentorId } = await this.mentorService.getMentorIdByUserId(userId);
    await this.groupService.addGroupMentor(mentorId, groupId);
    await this.groupEnrollmentService.addGroupEnrollment(groupId, userId, GroupEnrollmentAs.MENTOR);
    await this.mentorService.deleteRequest(id);
  }
}
