import { Group } from '../models/Group';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  public findAll() {
    return this.find();
  }

  public async findGroupByNameAndCategory(name: string, categoryId?: number) {
    return await this.createQueryBuilder('group')
      .select([
        'group.id',
        'group.mentorId',
        'group.ownerId',
        'group.name',
        'group.maxUserCnt',
        'group.curUserCnt',
        'group.intro',
        'group.startAt',
        'group.endAt',
        'group.categoryId',
        'group.status',
        'group_tech_stack.techStackId',
        'group_tech_stack.name',
        'user.name',
        'user.feverStack',
        'user.avatarUrl',
      ])
      .innerJoinAndSelect('group.techStacks', 'group_tech_stack')
      .innerJoinAndSelect('group.ownerInfo', 'user')
      .where('group.name like :filterdName', { filterdName: `%${name}%` })
      .andWhere('group.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  public async findGroupByName(name: string) {
    return await this.createQueryBuilder('group')
      .innerJoinAndSelect('group.techStacks', 'group_tech_stack')
      .innerJoinAndSelect('group.ownerInfo', 'user')
      .select([
        'group.id',
        'group.mentorId',
        'group.ownerId',
        'group.name',
        'group.maxUserCnt',
        'group.curUserCnt',
        'group.intro',
        'group.startAt',
        'group.endAt',
        'group.categoryId',
        'group.status',
      ])
      .addSelect(['group_tech_stack.techStackId', 'group_tech_stack.name'])
      .addSelect(['user.name', 'user.feverStack', 'user.avatarUrl'])
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
      .innerJoin('group.techStacks', 'ts')
      .innerJoin('group.groupEnrollments', 'ge')
      .innerJoin('ge.user', 'u')
      .select('group')
      .addSelect(['ts.techStackId', 'ts.name'])
      .addSelect(['ge.userId', 'ge.type'])
      .addSelect(['u.githubId', 'u.name', 'u.avatarUrl'])
      .where('group.id = :gid', { gid: groupId })
      .orderBy('ge.type', 'ASC')
      .getOne();
  }
}
