import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GroupEnrollment, GroupEnrollmentAs } from '../models/GroupEnrollment';

@Service()
@EntityRepository(GroupEnrollment)
export class GroupEnrollmentRepository extends Repository<GroupEnrollment> {
  findOneByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({
      where: { groupId, userId },
    });
  }

  findAllByUserIdAndType(userId: number, type: GroupEnrollmentAs) {
    return this.find({
      where: { userId, type },
    });
  }

  findTypeByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({
      where: { groupId, userId },
    });
  }
}
