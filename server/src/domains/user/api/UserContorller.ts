import { AuthService } from '@domains/auth/service/AuthService';
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
import { UpdateIntroDto } from '../dto/UpdateIntroDto';
import { UserService } from '../service/UserService';

@OpenAPI({ tags: ['사용자'] })
@Service()
@Controller('/user')
export class UserController {
  constructor(
    @Inject()
    private readonly userService: UserService,
    @Inject()
    private readonly authService: AuthService,
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
  public async getIntro(@Param('uid') userId: number) {
    return await this.userService.getUserIntro(userId);
  }

  @Patch('/intro')
  @OnUndefined(200)
  @OpenAPI({ summary: '자기소개를 업데이트하는 API' })
  public async updateIntro(@Body() { id, intro }: UpdateIntroDto) {
    await this.userService.updateUserIntro(id, intro);
  }

  @Get('/profile/:gid')
  @OpenAPI({ summary: '유저 프로필 정보를 가져오는 API' })
  @ResponseSchema(String)
  public async getProfile(@Param('gid') githubId: string) {
    return await this.authService.getUser(githubId);
  }
}
