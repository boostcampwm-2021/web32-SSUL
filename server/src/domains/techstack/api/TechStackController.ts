import { ProfileService } from '@domains/user/service/ProfileService';
import { Body, Controller, Get, Param, Put, OnUndefined } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { updateTechStackDto } from '../dto/updateTechStackDto';
import { TechStack } from '../models/TechStack';
import { UsingTechAs } from '../models/UsingTechStack';
import { TechStackService } from '../service/TechStackService';
import { UsingTechStackService } from '../service/UsingTechStackService';

@OpenAPI({
  tags: ['기술스택'],
})
@Service()
@Controller('/techstack')
export class TechStackController {
  @Inject()
  private readonly techStackService: TechStackService;
  @Inject()
  private readonly usingTechStackService: UsingTechStackService;
  @Inject()
  readonly profileService: ProfileService;

  @Get('/')
  getAll() {
    const techStackList = this.techStackService.getTechStackList();
    return techStackList;
  }

  @OpenAPI({ summary: '멘티 기술스택 리스트를 가져오는 API' })
  @ResponseSchema(TechStack, { isArray: true })
  @Get('/mentee/:uid')
  public async getMenteeTechStack(@Param('uid') userId: number) {
    const { id: profileId } = await this.profileService.getUserProfile(userId);
    return await this.usingTechStackService.getUserTechStack(profileId, UsingTechAs.MENTEE);
  }

  @OpenAPI({ summary: '멘토 기술스택 리스트를 가져오는 API' })
  @ResponseSchema(TechStack, { isArray: true })
  @Get('/mentor/:uid')
  public async getMentorTechStack(@Param('uid') userId: number) {
    const { id: profileId } = await this.profileService.getUserProfile(userId);
    return await this.usingTechStackService.getUserTechStack(profileId, UsingTechAs.MENTOR);
  }

  @OpenAPI({ summary: '멘티 기술스택 리스트를 업데이트하는 API' })
  @Put('/mentee')
  @OnUndefined(200)
  public async updateMenteeTechStack(@Body() { id, techStacks }: updateTechStackDto) {
    const profile = await this.profileService.getUserProfile(id);
    await this.usingTechStackService.updateUserTechStack(profile, UsingTechAs.MENTEE, techStacks);
  }
}
