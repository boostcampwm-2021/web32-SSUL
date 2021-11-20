import { Body, Controller, Get, Param, Put, OnUndefined } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { updateTechStackDto } from '../dto/updateTechStackDto';
import { TechStack } from '../models/TechStack';
import { TechStackService } from '../service/TechStackService';
import { UserService } from '@domains/user/service/UserService';
import { MentoringService } from '@domains/mentoring/service/MentoringService';
@OpenAPI({
  tags: ['기술스택'],
})
@Service()
@Controller('/techstack')
export class TechStackController {
  @Inject()
  private readonly techStackService: TechStackService;
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly mentorigService: MentoringService;

  @Get('/')
  getAll() {
    const techStackList = this.techStackService.getTechStackList();
    return techStackList;
  }

  @OpenAPI({ summary: '멘티 기술스택 리스트를 가져오는 API' })
  @ResponseSchema(TechStack, { isArray: true })
  @Get('/mentee/:uid')
  public async getMenteeTechStack(@Param('uid') userId: number) {
    return await this.techStackService.getMenteeTechStack(userId);
  }

  @OpenAPI({ summary: '멘토 기술스택 리스트를 가져오는 API' })
  @ResponseSchema(TechStack, { isArray: true })
  @Get('/mentor/:uid')
  public async getMentorTechStack(@Param('uid') userId: number) {
    const { mentorId } = await this.mentorigService.getMentorIdByUserId(userId);
    return await this.techStackService.getMentorTechStack(mentorId);
  }

  @OpenAPI({ summary: '멘티 기술스택 리스트를 업데이트하는 API' })
  @Put('/mentee')
  @OnUndefined(200)
  public async updateMenteeTechStack(@Body() { id, techStacks }: updateTechStackDto) {
    const userInfo = await this.userService.getUserInfo(id);
    await this.techStackService.updateMenteeTechStack(userInfo, techStacks);
  }
}
