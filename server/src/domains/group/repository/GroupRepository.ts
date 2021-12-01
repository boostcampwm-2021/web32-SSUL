import { Group } from '../models/Group';
import { Service } from 'typedi';
import { Repository, EntityRepository, Like, In } from 'typeorm';

const ROW_PER_PAGE = 9;

@Service()
@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  public async findAll(
    filters: { name: string; category: number; inputTechStackNames: string[] },
    curPage: number,
  ) {
    const { name, category, inputTechStackNames } = filters;
    const query = this.createQueryBuilder('group').innerJoin('group.techStacks', 'techStacks');

    if (category !== undefined) {
      query.where('group.categoryId = :category', { category });
    }

    if (name !== '') {
      query.andWhere('group.name LIKE :name', { name: `%${name}%` });
    }

    if (inputTechStackNames.length != 0) {
      query.andWhere('techStacks.name IN (:...techStackName)', {
        techStackName: inputTechStackNames,
      });
    }

    const totalRows = await query.getCount();
    const totalPage = Math.ceil(totalRows / ROW_PER_PAGE);

    const filteredGroups = await query
      .take(ROW_PER_PAGE)
      .skip(ROW_PER_PAGE * (curPage - 1))
      .getMany();
    const groupIds = filteredGroups.map((group) => group.id);

    const page = await this.find({
      relations: ['techStacks', 'category', 'ownerInfo'],
      where: { id: In(groupIds) },
    });

    return { groups: page, totalPage };
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
