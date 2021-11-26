import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { Mentor } from '../models/Mentor';

@Service()
@EntityRepository(Mentor)
export class MentorRepository extends Repository<Mentor> {
  public findAllByName(name: string) {
    return this.createQueryBuilder('mentor')
      .innerJoin('mentor.techStacks', 'mentor_tech_stack')
      .innerJoin('mentor.user', 'user')
      .select(['mentor.id'])
      .addSelect(['mentor_tech_stack.id', 'mentor_tech_stack.name'])
      .addSelect([
        'user.id',
        'user.name',
        'user.shareStack',
        'user.avatarUrl',
        'user.githubId',
        'user.intro',
        'user.createdAt',
      ])
      .where('user.name like :filterdName', { filterdName: `%${name}%` })
      .getMany();
  }

  public findOneByUserId(userId: number) {
    return this.findOne({
      where: { userId },
    });
  }
}
