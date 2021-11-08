import { Controller, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { TechStackService } from '../service/TechStackService';

@Service()
@Controller('/techstack')
export class CategoryController {
  @Inject()
  private readonly techStackService: TechStackService;

  @Get('/')
  getAll() {
    const techStackList = this.techStackService.getTechStackList();
    return techStackList;
  }
}
