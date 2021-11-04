import { Service } from 'typedi';
import { CategoryRepository } from '../repository/CategoryRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class CategoryService {
  constructor(
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async getCategories() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
