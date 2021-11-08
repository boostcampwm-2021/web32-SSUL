import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import axios from 'axios';
import { UserRepository } from '../../user/repository/UserRepository';
import { ProfileRepository } from '../../user/repository/ProfileRepository';
import { GithubUserDto } from '../Dto/AuthDto';
import { UserDto } from '../../user/dto/UserDto';
import { destructObject } from '../../../utils/Object';

@Service()
export class AuthService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository,
    @InjectRepository()
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async getGithubAccessToken(code: string) {
    const { GITHUB_CI: clientId, GITHUB_CS: clientSecret } = process.env;
    const githubAccessTokenUrl = 'https://github.com/login/oauth/access_token';
    const authUrl = `${githubAccessTokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    const tokenResponse = await axios.post(authUrl);
    const accessToken = tokenResponse.data.split('&')[0].split('=')[1];
    return accessToken;
  }

  public async getGithubUserData(accessToken: string): Promise<GithubUserDto> {
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

  public async findOrInsertUser(user: GithubUserDto): Promise<UserDto> {
    const { githubId } = user;
    let profileData = await this.profileRepository.findOneByUserId(githubId);
    if (!profileData) {
      const userData = await this.userRepository.insertUser(user);
      profileData = await this.profileRepository.insertProfile(userData);
    }

    const userData = destructObject(profileData);
    return userData as UserDto;
  }

  public async getUserProfile(id: string): Promise<UserDto> {
    let userData = await this.profileRepository.findOneByUserId(id);
    return destructObject(userData) as UserDto;
  }
}
