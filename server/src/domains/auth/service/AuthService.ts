import { Service } from 'typedi';
import axios from 'axios';

interface GithubUserData {
  githubId: string;
  githubName: string;
  avatarUrl: string;
}

@Service()
export class AuthService {
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
      name: githubName,
      avatar_url: avatarUrl,
    }: GithubUserOriginData = userResponse.data;

    return { githubId, githubName, avatarUrl };
  }
}
