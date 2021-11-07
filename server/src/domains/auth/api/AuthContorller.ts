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
  @Inject()
  private readonly authService: AuthService;

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
