import { User } from '../models/User';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GithubUserDto } from '../../auth/dto/AuthDto';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async insertUser(user: GithubUserDto) {
    return await this.save({ ...user, createdAt: new Date() });
  }

  public async findOneById(id: string) {
    return await this.findOne({ githubId: id });
  }
}
