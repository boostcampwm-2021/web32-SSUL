import {
  Controller,
  Get,
  QueryParam,
  Session,
  SessionParam,
  OnUndefined,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthService } from '../service/AuthService';
import { GithubUserDto } from '../dto/AuthDto';
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
  async getAuthentification(
    @SessionParam('githubId') githubId: string,
    @SessionParam('role') role: string,
  ) {
    if (!githubId) return;
    const userData = await this.authService.getUserProfile(githubId);
    return { ...userData, role: role } as UserDto;
  }

  @Get('/token')
  @OpenAPI({ summary: 'Github OAuth 토큰을 발급받는 API' })
  @ResponseSchema(GithubUserDto, { description: '토큰 정상 발급' })
  async getGithubAccessToken(
    @Session() session: any,
    @SessionParam('githubId') githubId: string,
    @QueryParam('code') code: string,
  ) {
    const accessToken = await this.authService.getGithubAccessToken(code);
    const githubUserData = await this.authService.getGithubUserData(accessToken);
    const userData = await this.authService.findOrInsertUser(githubUserData);
    if (!githubId) {
      session.githubId = githubUserData.githubId;
      session.role = 'MENTEE';
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
