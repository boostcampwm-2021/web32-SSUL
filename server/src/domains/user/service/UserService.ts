import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../models/User';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository,
  ) {}

  public async getUserIntro(userId: number) {
    const { intro }: User = await this.userRepository.findOneOrFailByUserId(userId);
    return intro;
  }

  public async getUserInfo(userId: number) {
    return await this.userRepository.findOneOrFailByUserId(userId);
  }

  public async updateUserIntro(userId: number, intro: string) {
    const targetProfile: User = await this.userRepository.findOneOrFailByUserId(userId);

    targetProfile.intro = intro;
    this.userRepository.updateIntro(targetProfile);
  }
}
