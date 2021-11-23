import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { ApplyGroup } from '../models/ApplyGroup';

@Service()
@EntityRepository(ApplyGroup)
export class ApplyGroupRepository extends Repository<ApplyGroup> {
  findOneByGroupIdAndUserId(groupId: number, userId: number) {
    return this.findOne({ where: { groupId, userId } });
  }
}
