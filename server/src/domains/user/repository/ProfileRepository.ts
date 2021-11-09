import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { ProfileDto } from '../dto/ProfileDto';

@Service()
@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async insertProfile(user: User) {
    const defaultProfile: ProfileDto = {
      userId: user,
      feverStack: 36.5,
      shareStack: 0,
      introduction: '',
    };
    await this.insert(defaultProfile);
    return await this.findOneByUserId(user.githubId);
  }
  public async findOneByUserId(id: string) {
    const profile = await this.createQueryBuilder('profile')
      .select([
        'user.id',
        'user.githubId',
        'user.name',
        'user.avatarUrl',
        'profile.feverStack',
        'profile.shareStack',
      ])
      .leftJoin('profile.user', 'user')
      .getOne();

    return profile;
  }
}
