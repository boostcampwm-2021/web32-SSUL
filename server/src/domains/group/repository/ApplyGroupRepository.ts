import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { ApplyGroup, ApplyGroupState } from '../models/ApplyGroup';

@Service()
@EntityRepository(ApplyGroup)
export class ApplyGroupRepository extends Repository<ApplyGroup> {
  findAllByUserIdAndState(userId: number, state: ApplyGroupState) {
    return this.find({
      where: { userId, state },
    });
  }

  findOneByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({ where: { groupId, userId } });
  }
}