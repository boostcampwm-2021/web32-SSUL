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
import { UserDto } from '@domains/user/dto/UserDto';
import { NobodyDto } from '../dto/AuthDto';
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
  @OpenAPI({
    summary: '유저 세션 정보를 조회하는 API',
    responses: {
      '203': {
        description: '유저 세션 정보 없음',
      },
    },
  })
  @ResponseSchema(UserDto, { description: '유저 세션 정보 있음' })
  @OnUndefined(203)
  async getAuthentification(
    @SessionParam('githubId') githubId: string,
    @SessionParam('role') role: string,
  ) {
    if (!githubId) return;
    const userData = await this.authService.getUserProfile(githubId);
    return { ...userData, role: role } as UserDto;
  }

  @Get('/token')
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
  async postLogout(@Session() session: any) {
    session.destroy();
  }
}
