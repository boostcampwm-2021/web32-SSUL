import { ProfileService } from '@domains/user/service/ProfileService';
import { Controller, Get, Param } from 'routing-controllers';
import { Inject, Service } from 'typedi';
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
}
