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
    return await this.createQueryBuilder('group')
      .where('group.name like :filterdName', { filterdName: `%${name}%` })
      .andWhere('group.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  public async findGroupByName(name: string) {
    return await this.createQueryBuilder('group')
      .where('group.name like :filterdName', { filterdName: `%${name}%` })
      .getMany();
  }
}
