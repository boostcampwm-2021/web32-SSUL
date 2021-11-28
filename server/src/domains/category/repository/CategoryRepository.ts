import { Category } from '../models/Category';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public findAll() {
    return this.find();
  }

  public findOneByCategoryName(name: string) {
    return this.findOne({
      where: { name },
    });
  }

  public findOneById(id: string) {
    return this.findOne({
      where: { id },
    });
  }
}
