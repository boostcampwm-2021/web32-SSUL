import { Service } from 'typedi';
import { Repository, EntityRepository, Like } from 'typeorm';
import { Mentor } from '../models/Mentor';

@Service()
@EntityRepository(Mentor)
export class MentorRepository extends Repository<Mentor> {
  public findAllByName(name: string) {
    return this.find({
      relations: ['techStacks', 'user'],
      where: {
        user: {
          name: Like(`%${name}%`),
        },
      },
    });
  }

  public findOneByUserId(userId: number) {
    return this.findOne({
      where: { userId },
    });
  }

  public findOneById(mentorId: number) {
    return this.findOne(mentorId);
  }
}
