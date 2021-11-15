import {
  Controller,
  Patch,
  Session,
  SessionParam,
  OnUndefined,
  Get,
  Param,
  Body,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { UpdateIntroDto } from '../dto/UpdateIntroDto';
import { ProfileService } from '../service/ProfileService';

@OpenAPI({ tags: ['사용자'] })
@Service()
@Controller('/user')
export class UserController {
  constructor(
    @Inject()
    private readonly profileService: ProfileService,
  ) {}

  @Patch('/role')
  @OnUndefined(200)
  @OpenAPI({
    summary: '사용자 역할 상태를 변경시키는 API',
    responses: {
      '200': {
        description: '역할 변경 성공',
      },
    },
  })
  async patchRole(
    @Session() session: any,
    @SessionParam('githubId') githubId: string,
    @SessionParam('role') role: string,
  ) {
    if (!githubId) return;
    session.role = role === 'MENTEE' ? 'MENTOR' : 'MENTEE';
  }

  @Get('/intro/:uid')
  @OpenAPI({ summary: '유저 자기소개를 가져오는 API' })
  @ResponseSchema(String)
  public getIntro(@Param('uid') userId: number) {
    return this.profileService.getUserIntro(userId);
  }

  @Patch('/intro')
  @OnUndefined(200)
  @OpenAPI({ summary: '자기소개를 업데이트하는 API' })
  public updateIntro(@Body() { id, intro }: UpdateIntroDto) {
    this.profileService.updateUserIntro(id, intro);
  }
}
