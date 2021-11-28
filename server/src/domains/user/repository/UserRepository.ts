import { User } from '../models/User';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async insertUser(user: User) {
    return await this.save(user);
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
