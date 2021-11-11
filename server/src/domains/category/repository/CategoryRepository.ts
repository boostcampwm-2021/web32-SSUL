import { Category } from '../models/Category';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public findAll() {
    return this.find();
  }

  public async findOneByCategoryName(name: string) {
    return await this.createQueryBuilder('category')
      .where('category.name = :name', { name })
      .getOne();
  }
}
