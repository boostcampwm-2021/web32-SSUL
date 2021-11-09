import { UsingTechStack } from '../models/UsingTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(UsingTechStack)
export class UsingTechStackRepository extends Repository<UsingTechStack> {
  public findAll() {
    return this.find();
  }

  public async findUsingTechStackListByGroupId(groupId: number): Promise<UsingTechStack[]> {
    const groupTechStackJoinResult = await this.createQueryBuilder('using_tech_stack')
      .innerJoinAndSelect('using_tech_stack.techStack', 'tech_stack')
      .where('using_tech_stack.type = :type', { type: 'GROUP' })
      .andWhere('using_tech_stack.groupId = :groupId', { groupId })
      .getMany();

    return groupTechStackJoinResult;
  }
  public createUsingTechStack(usingTechStack: UsingTechStack) {
    return this.save(usingTechStack);
  }
}