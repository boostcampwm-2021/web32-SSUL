import { Service } from 'typedi';
import { TechStackRepository } from '../repository/TechStackRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class TechStackService {
  constructor(
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
  ) {}

  public async getTechStackList() {
    const techStackList = await this.techStackRepository.findAll();
    return techStackList;
  }
}
