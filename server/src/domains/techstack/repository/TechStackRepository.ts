import { TechStack } from '../models/TechStack';
import { UsingTechStack } from '../models/UsingTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { destructObject } from '@utils/Object';
import { GroupTechStackListDto } from '../dto/groupTechStackListDto';

@Service()
@EntityRepository(TechStack)
@EntityRepository(UsingTechStack)
export class TechStackRepository extends Repository<TechStack> {
  public findAll() {
    return this.find();
  }
  public async findTechStackListByGroupId(groupId: number) {
    const groupTechStackJoinResult = await this.createQueryBuilder('using_tech_stack')
      .innerJoinAndSelect('using_tech_stack.techStack', 'tech_stack')
      .where('using_tech_stack.type = :type', { type: 'GROUP' })
      .andWhere('using_tech_stack.groupId = :groupId', { groupId })
      .getMany();

    const techStackArray = groupTechStackJoinResult.map((techStack) => {
      const { name } = destructObject(techStack) as GroupTechStackListDto;
      return name;
    });
    return techStackArray;
  }
}
