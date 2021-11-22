import { User } from '../models/User';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GithubUserDto } from '../../auth/dto/GithubUserDto';

const DEFAULT_FEVER_STACK = 36.5;
const DEFAULT_SHARE_STACK = 0;

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async insertUser(user: GithubUserDto) {
    const initialProfile = {
      feverStack: DEFAULT_FEVER_STACK,
      shareStack: DEFAULT_SHARE_STACK,
      intro: '',
      createdAt: new Date(),
    };
    return await this.save({ ...user, ...initialProfile });
  }

  public async findOneById(id: string) {
    return await this.findOne({ githubId: id });
  }

  public async findOneOrFailByUserId(id: number) {
    return this.findOneOrFail(id);
  }

  public async updateIntro(user: User) {
    await this.save(user);
  }
}
