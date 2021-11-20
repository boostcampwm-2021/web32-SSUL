import { Controller, Get, QueryParam, Session, OnUndefined, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthService } from '../service/AuthService';
import { UserDto } from '@domains/user/dto/UserDto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@OpenAPI({ tags: ['인증'] })
@Service()
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  @Get('/silent-refresh')
  @OnUndefined(203)
  @OpenAPI({
    summary: '유저 세션 정보를 조회하는 API',
    responses: {
      '203': {
        description: '유저 세션 정보 없음',
      },
    },
  })
  @ResponseSchema(UserDto, { description: '유저 세션 정보 있음' })
  async getAuthentification(@Session() session: any) {
    if (!session.user) return;
    const { githubId, role } = session.user;
    const userData = await this.authService.getUserProfile(githubId);
    return { ...userData, role } as UserDto;
  }

  @Post('/login/social')
  @OpenAPI({ summary: 'Github OAuth 로그인 API' })
  @ResponseSchema(UserDto)
  async socialLogin(@Session() session: any, @QueryParam('code') code: string) {
    const accessToken = await this.authService.getGithubAccessToken(code);
    const githubUserData = await this.authService.getGithubUserData(accessToken);
    const userData = await this.authService.findOrInsertUser(githubUserData);
    if (!session.user) {
      session.user = {
        githubId: githubUserData.githubId,
        role: 'MENTEE',
        id: userData.id,
      };
    }

    return userData;
  }

  @Get('/logout')
  @OnUndefined(204)
  @OpenAPI({
    summary: '사용자 로그아웃하는 API',
    responses: {
      '204': {
        description: '로그아웃 완료',
      },
    },
  })
  async postLogout(@Session() session: any) {
    session.destroy();
  }
}
