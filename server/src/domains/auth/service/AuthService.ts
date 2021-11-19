import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import axios from 'axios';
import { UserRepository } from '@domains/user/repository/UserRepository';
import { ProfileRepository } from '@domains/user/repository/ProfileRepository';
import { GithubUserDto } from '../dto/GithubUserDto';
import { UserDto } from '@domains/user/dto/UserDto';
import { destructObject } from '@utils/Object';
import { BusinessLogicError } from '@common/error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

@Service()
export class AuthService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository,
    @InjectRepository()
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async getGithubAccessToken(code: string): Promise<string> {
    const { GITHUB_CI: clientId, GITHUB_CS: clientSecret } = process.env;
    const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
    const authUrl = `${githubAccessTokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

    try {
      const tokenResponse = await axios.post(authUrl);
      const accessToken = tokenResponse.data.split('&')[0].split('=')[1];
      return accessToken;
    } catch (err) {
      throw new BusinessLogicError(400, `can't get github access token`, ErrorCode.OAUTH_ERROR);
    }
  }

  public async getGithubUserData(accessToken: string): Promise<GithubUserDto> {
    try {
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const { login: githubId, name: name, avatar_url: avatarUrl } = userResponse.data;

      return { githubId, name, avatarUrl };
    } catch (err) {
      throw new BusinessLogicError(400, 'github api error', ErrorCode.OAUTH_ERROR);
    }
  }

  public async findOrInsertUser(user: GithubUserDto): Promise<UserDto> {
    const { githubId } = user;
    let profileData = await this.profileRepository.findOneByGithubId(githubId);
    if (!profileData) {
      //TODO: transaction need
      const userData = await this.userRepository.insertUser(user);
      profileData = await this.profileRepository.insertProfile(userData);
    }

    return destructObject(profileData) as UserDto;
  }

  public async getUserProfile(id: string): Promise<UserDto> {
    let userData = await this.profileRepository.findOneByGithubId(id);
    return destructObject(userData) as UserDto;
  }
}
