import { Service } from 'typedi';
import { TechStackRepository } from '../repository/TechStackRepository';
import { UsingTechStackRepository } from '../repository/UsingTechStackRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class TechStackService {
  constructor(
    @InjectRepository()
    private readonly usingTechStackRepository: UsingTechStackRepository,
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
  ) {}

  public async getTechStackList() {
    const techStackList = await this.techStackRepository.findAll();
    return techStackList;
  }

  public async getGroupTechStackList() {
    const techStackList = await this.usingTechStackRepository
      .createQueryBuilder('using_tech_stack')
      .innerJoinAndSelect('using_tech_stack.techStack', 'tech_stack')
      .where('using_tech_stack.type = :type', { type: 'GROUP' })
      .getMany();
    return techStackList;
  }
}
