import { Controller, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CategoryService } from '../service/CategoryService';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Category } from '../models/Category';

@Service()
@Controller('/category')
export class CategoryController {
  constructor(
    @Inject()
    private readonly categoryService: CategoryService,
  ) {}

  @Get('/')
  @ResponseSchema(Category, {
    isArray: true,
  })
  async getAll() {
    const categories = await this.categoryService.getCategories();
    return categories;
  }
}
