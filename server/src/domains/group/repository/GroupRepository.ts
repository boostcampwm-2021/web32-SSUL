import { Group, GroupState } from '../models/Group';
import { Service } from 'typedi';
import { Repository, EntityRepository, Like } from 'typeorm';

@Service()
@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  public findAll() {
    return this.find();
  }

  public findAllByNameAndCategoryId(name: string, categoryId?: number) {
    return this.find({
      relations: ['techStacks', 'category', 'ownerInfo'],
      where: { name: Like(`%${name}%`), categoryId },
    });
  }

  public findAllByName(name: string) {
    return this.find({
      relations: ['techStacks', 'category', 'ownerInfo'],
      where: { name: Like(`%${name}%`) },
    });
  }

  public findOneById(groupId: number) {
    return this.findOne({
      relations: ['techStacks', 'groupEnrollments', 'groupEnrollments.user'],
      where: { id: groupId },
    });
  }

  public findAllByOwnerId(ownerId: number) {
    return this.find({
      where: { ownerId },
    });
  }

  public findOneOrFailById(id: number) {
    return this.findOneOrFail(id);
  }
}
