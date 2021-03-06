import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { ApplyGroup, ApplyGroupState } from '../models/ApplyGroup';

@Service()
@EntityRepository(ApplyGroup)
export class ApplyGroupRepository extends Repository<ApplyGroup> {
  public findAllByUserIdAndState(userId: number, state: ApplyGroupState) {
    return this.find({
      where: { userId, state },
    });
  }

  public findOneByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({ where: { groupId, userId } });
  }

  public findAllByGroupIdAndState(groupId: number, state: ApplyGroupState) {
    return this.find({
      where: { groupId, state },
      order: { createdAt: 'ASC' },
    });
  }

  public findOneOrFailById(id: number) {
    return this.findOneOrFail(id);
  }
}
