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
      userId: user.id,
      feverStack: 36.5,
      shareStack: 0,
      introduction: '',
    };
    await this.insert(defaultProfile);
    return await this.findOneByGithubId(user.githubId);
  }
  public async findOneByGithubId(githubId: string) {
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
      .where('user.githubId = :githubId', { githubId })
      .getOne();

    return profile;
  }

  public async findOwnerInfoByUserId(id: number) {
    const profile = await this.createQueryBuilder('profile')
      .select(['user.name', 'profile.feverStack', 'user.avatarUrl'])
      .leftJoin('profile.user', 'user')
      .where('profile.userId = :id', { id })
      .getOne();
    return [profile?.user.name, profile?.feverStack, profile?.user.avatarUrl];
  }

  public async findOneOrFailByUserId(id: number) {
    return this.findOneOrFail({ where: { userId: id } });
  }

  public async updateIntro(profile: Profile) {
    await this.save(profile);
  }
}
