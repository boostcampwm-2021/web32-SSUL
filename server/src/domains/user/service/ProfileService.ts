import { Service } from 'typedi';
import { ProfileRepository } from '../repository/ProfileRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class ProfileService {
  constructor(
    @InjectRepository()
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async getUserFeverStack(userId: number) {
    const userInfo = await this.profileRepository.findOneByUserId(userId);
    return userInfo?.feverStack;
  }
}
