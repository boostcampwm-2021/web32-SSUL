import { Category } from '@domains/category/models/Category';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { MentoringRequest } from '../models/MentoringRequest';

@Service()
@EntityRepository(MentoringRequest)
export class MentoringRequestRepository extends Repository<MentoringRequest> {
  public async findAllByMentorId(mentorId: number) {
    return await this.createQueryBuilder('mentoring_request')
      .innerJoinAndSelect('mentoring_request.group', 'group')
      .where('mentoring_request.mentor = :id', { id: mentorId })
      .getMany();
  }

  public findAll() {
    return this.find();
  }

  public findOneByMentorIdAndGroupId(mentorId: number, groupId: number) {
    return this.findOne({ where: { mentorId, groupId } });
  }

  public deleteByMentorIdAndGroupId(mentorId: number, groupId: number) {
    this.delete({ mentorId, groupId });
  }
}
