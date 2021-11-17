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

  public async findEndGroupByUserId(userId: number) {
    return await this.createQueryBuilder('group')
      .innerJoinAndSelect('group.groupEnrollments', 'group_enrollment')
      .where('group.status = :status', { status: 'END' })
      .andWhere('group_enrollment.user = :userId', { userId })
      .getMany();
  }

  public async findGroupDetailByGroupId(groupId: number) {
    return this.createQueryBuilder('group')
      .innerJoin('group.usingTechStacks', 'uts')
      .innerJoin('group.groupEnrollments', 'ge')
      .innerJoin('uts.techStack', 'ts')
      .innerJoin('ge.user', 'u')
      .select('group')
      .addSelect('uts.techStackId')
      .addSelect('ge.userId')
      .addSelect('ts.name')
      .addSelect(['u.githubId', 'u.name', 'u.avatarUrl'])
      .where('group.id = :gid', { gid: groupId })
      .getOne();
  }
}
