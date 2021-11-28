import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { GroupState } from '../models/Group';
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

  findAllByUserId(userId: number) {
    return this.find({
      where: { userId },
    });
  }

  findTypeByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({
      where: { groupId, userId },
    });
  }

  findGroupByUserIdAndStatus(userId: number, status: GroupState) {
    return this.find({ relations: ['group'], where: { userId, group: { status } } });
  }
}
