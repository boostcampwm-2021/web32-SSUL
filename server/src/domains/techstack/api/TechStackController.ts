import { ProfileService } from '@domains/user/service/ProfileService';
import { Body, Controller, Get, Param, Put, OnUndefined } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { updateTechStackDto } from '../dto/updateTechStackDto';
import { UsingTechAs } from '../models/UsingTechStack';
import { TechStackService } from '../service/TechStackService';
import { UsingTechStackService } from '../service/UsingTechStackService';

@Service()
@Controller('/techstack')
export class CategoryController {
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

  @Get('/mentee/:uid')
  public async getMenteeTechStack(@Param('uid') userId: number) {
    const { id: profileId } = await this.profileService.getUserProfile(userId);
    return await this.usingTechStackService.getUserTechStack(profileId, UsingTechAs.MENTEE);
  }

  @Get('/mentor/:uid')
  public async getMentorTechStack(@Param('uid') userId: number) {
    const { id: profileId } = await this.profileService.getUserProfile(userId);
    return await this.usingTechStackService.getUserTechStack(profileId, UsingTechAs.MENTOR);
  }

  @Put('/mentee')
  @OnUndefined(200)
  public async updateMenteeTechStack(@Body() { id, techStacks }: updateTechStackDto) {
    const profile = await this.profileService.getUserProfile(id);
    await this.usingTechStackService.updateUserTechStack(
      profile,
      UsingTechAs.MENTEE,
      techStacks,
    );
  }
}
