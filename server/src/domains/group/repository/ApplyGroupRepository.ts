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
  public findApplyListByGroupId(gid: number) {
    return this.createQueryBuilder('apply_group')
      .innerJoinAndSelect('apply_group.user', 'user')
      .where('apply_group.groupId = :gid', { gid })
      .andWhere('state = "PENDING"')
      .orderBy('apply_group.createdAt', 'ASC')
      .getMany();
  }

  public updateApplyState(id: number, state: ApplyGroupState) {
    return this.update({ id }, { state });
  }

  public findApplyData(id: number, ownerId: number) {
    return this.createQueryBuilder('apply_group')
      .innerJoinAndSelect('apply_group.group', 'group')
      .where('apply_group.id = :id', { id })
      .andWhere('group.ownerId = :ownerId', { ownerId })
      .getOne();
  }
}
