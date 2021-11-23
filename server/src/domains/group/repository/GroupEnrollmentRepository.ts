import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GroupEnrollment } from '../models/GroupEnrollment';

@Service()
@EntityRepository(GroupEnrollment)
export class GroupEnrollmentRepository extends Repository<GroupEnrollment> {
  findOneByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({
      where: { groupId, userId },
    });
  }
}
