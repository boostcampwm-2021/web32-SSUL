import { UsingTechAs } from '@domains/techstack/models/UsingTechStack';
import { UsingTechStackService } from '@domains/techstack/service/UsingTechStackService';
import { ProfileService } from '@domains/user/service/ProfileService';
import { Controller, OnUndefined, Body, Post, Get, Param } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { MentoringRequestListDto } from '../dto/MentoringRequestListDto';
import { RegisterMentoDto } from '../dto/RegisterMentoDto';
import { MentorService } from '../service/MentorService';

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
  ) {}

  @Post('/mentor')
  @OpenAPI({ summary: '멘토를 생성하는 API' })
  @OnUndefined(200)
  public async registerMentor(@Body() { userId, techStacks }: RegisterMentoDto) {
    await this.mentorService.createMentor(userId);
    const profile = await this.profileService.getUserProfile(userId);
    this.usingTechStackService.createUserTechStack(profile, UsingTechAs.MENTOR, techStacks);
  }

  @Get('/request/:mid')
  @OpenAPI({summary: '멘토링 요청 리스트를 가져오는 API'})
  @ResponseSchema(MentoringRequestListDto)
  public async getRequest(@Param('mid') mentorId: number){
    return await this.mentorService.getRequestListByMentorId(mentorId);
  }
}
