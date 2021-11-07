import { User } from '../../user/models/User';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GithubUserData } from '../auth.interface';

@Service()
@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  public async insertUser(user: GithubUserData) {
    await this.insert({ ...user, createdAt: new Date() });
  }

  public async findOneById(id: string) {
    return await this.findOne({ githubId: id });
  }
}
