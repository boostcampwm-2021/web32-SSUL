import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import axios from 'axios';
import { AuthRepository } from '../repository/AuthRepository';
import { GithubUserData } from '../auth.interface';

@Service()
export class AuthService {
  constructor(
    @InjectRepository()
    private readonly authRepository: AuthRepository,
  ) {}

  public async getGithubAccessToken(code: string) {
    const { GITHUB_CI: clientId, GITHUB_CS: clientSecret } = process.env;
    const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
    const authUrl = `${githubAccessTokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    const tokenResponse = await axios.post(authUrl);
    const accessToken = tokenResponse.data.split('&')[0].split('=')[1];
    return accessToken;
  }

  public async getGithubUserData(accessToken: string): Promise<GithubUserData> {
    interface GithubUserOriginData {
      login: string;
      name: string;
      avatar_url: string;
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const {
      login: githubId,
      name: name,
      avatar_url: avatarUrl,
    }: GithubUserOriginData = userResponse.data;

    return { githubId, name, avatarUrl };
  }

  public async findOrInsertUser(user: GithubUserData): Promise<GithubUserData> {
    const { githubId, name, avatarUrl } = user;
    let userData = await this.authRepository.findOneById(githubId);
    if (!userData) {
      await this.authRepository.insertUser(user);
      userData = await this.authRepository.findOneById(githubId);
    }
    return userData as GithubUserData;
  }
}
