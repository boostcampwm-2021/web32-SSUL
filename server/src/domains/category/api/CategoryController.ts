import { Controller, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CategoryService } from '../service/CategoryService';

@Service()
@Controller('/category')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Get('/')
  getAll() {
    const categories = this.categoryService.getCategories();
    return categories;
  }
}
