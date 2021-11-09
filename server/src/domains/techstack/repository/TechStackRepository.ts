import { TechStack } from '../models/TechStack';
import { UsingTechStack } from '../models/UsingTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(TechStack)
export class TechStackRepository extends Repository<TechStack> {
  public findAll() {
    return this.find();
  }
  public async findTechStackListByGroupId(groupId: number): Promise<any[]> {
    const groupTechStackJoinResult = await this.createQueryBuilder('using_tech_stack')
      .innerJoinAndSelect('using_tech_stack.techStack', 'tech_stack')
      .where('using_tech_stack.type = :type', { type: 'GROUP' })
      .andWhere('using_tech_stack.groupId = :groupId', { groupId })
      .getMany();

    return groupTechStackJoinResult;
  }
}
