import { Group } from '../models/Group';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  public findAll() {
    return this.find();
  }
  public createGroup(group: Group) {
    return this.save(group);
  }
  public async findGroupByNameAndCategory(name: string, categoryId?: number) {
    const findByName = await this.createQueryBuilder('group').where(
      'group.name like :filterdName',
      {
        filterdName: `%${name}%`,
      },
    );

    if (categoryId === undefined) return findByName.getMany();
    else return findByName.where('group.categoryId = :categoryId', { categoryId }).getMany();
  }
}
