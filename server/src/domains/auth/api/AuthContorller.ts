import {
  Controller,
  Get,
  QueryParam,
  Session,
  OnUndefined,
  Post,
  UseBefore,
  Body,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthService } from '../service/AuthService';
import { GroupService } from '@domains/group/service/GroupService';
import { UserResponse } from '@domains/user/dto/UserResponse';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import config from '@config/index';
import { ForbiddenAccessError } from '@common/error/ForbidenAccessError';

@OpenAPI({ tags: ['인증'] })
@Service()
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject()
    private readonly authService: AuthService,
    @Inject()
    private readonly groupService: GroupService,
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
  @ResponseSchema(UserResponse, { description: '유저 세션 정보 있음' })
  async getAuthentification(@Session() session: any) {
    if (!session.user) return;
    const { githubId, role } = session.user;
    const userData = await this.authService.getUser(githubId);
    return { ...userData, role } as UserResponse;
  }

  @Post('/test-login')
  @OnUndefined(200)
  public async testLogin(@Session() session: any, @Body() loginDto: any) {
    if (config.mode !== 'prod') {
      session.user = loginDto;
    } else {
      throw new ForbiddenAccessError();
    }
  }

  @Post('/login/social')
  @OpenAPI({ summary: 'Github OAuth 로그인 API' })
  @ResponseSchema(UserResponse)
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
  @UseBefore(isLoggedIn)
  @OpenAPI({
    summary: '사용자 로그아웃하는 API',
    responses: {
      '204': {
        description: '로그아웃 완료',
      },
    },
  })
  async postLogout(@Session() session: any) {
    session.user = null;
  }

  @Get('/')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({
    summary: '사용자의 인증 여부 조회 API',
  })
  async isUserAuth() {}

  @Get('/group/belong')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({
    summary: '사용자의 그룹 소속 여부 조회 API',
  })
  async isGroupBelong(@Session() session: any, @QueryParam('gid') gid: number) {
    const { id: uid } = session.user;
    await this.groupService.checkGroupBelong(uid, gid);
  }

  @Get('/group/owner')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({
    summary: '사용자의 그룹장 여부 조회 API',
  })
  async isGroupOwner(@Session() session: any, @QueryParam('gid') gid: number) {
    const { id: uid } = session.user;
    await this.groupService.checkGroupBelong(uid, gid);
  }
}
