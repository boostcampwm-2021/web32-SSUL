import { Category } from '@domains/category/models/Category';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { MentoringRequest } from '../models/MentoringRequest';

@Service()
@EntityRepository(MentoringRequest)
export class MentoringRequestRepository extends Repository<MentoringRequest> {
  public findAllByMentorId(mentorId: number) {
    return this.find({ where: { mentorId } });
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
