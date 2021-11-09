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

@Service()
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject()
    private readonly authService: AuthService,
  ) {}

  @Get('/silent-refresh')
  @OnUndefined(203)
  async getAuthentification(@SessionParam('githubId') githubId: string) {
    if (!githubId) return;
    return await this.authService.getUserProfile(githubId);
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
    if (!githubId) session.githubId = githubUserData.githubId;

    return userData;
  }

  @Get('/logout')
  @OnUndefined(204)
  async postLogout(@Session() session: any) {
    session.destroy();
  }
}
