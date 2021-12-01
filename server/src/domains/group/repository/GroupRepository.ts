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
    const query = this.createQueryBuilder('group');

    if (category !== undefined) {
      query.where('group.categoryId = :category', { category });
    }

    if (name !== '') {
      query.andWhere('group.name LIKE :name', { name: `%${name}%` });
    }

    if (inputTechStackNames.length != 0) {
      query
        .innerJoin('group.techStacks', 'techStacks')
        .andWhere('techStacks.name IN (:...techStackName)', {
          techStackName: inputTechStackNames,
        });
    }

    const totalRows = await query.getCount();
    const totalPage = Math.ceil(totalRows / ROW_PER_PAGE);

    const groups = await query
      .select(['group.id'])
      .take(ROW_PER_PAGE)
      .skip(ROW_PER_PAGE * (curPage - 1))
      .getMany();
    const ids = groups.map((g) => g.id);

    const page = await this.find({
      relations: ['techStacks', 'category'],
      where: { id: In(ids) },
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
