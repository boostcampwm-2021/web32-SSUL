import { Controller, Get, QueryParam } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthService } from '../service/AuthService';

@Service()
@Controller('/auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Get('/token')
  async getAll(@QueryParam('code') code: string) {
    const accessToken = await this.authService.getGithubAccessToken(code);
    const githubUserData = await this.authService.getGithubUserData(accessToken);
    console.log(githubUserData);
    return githubUserData;
  }
}
