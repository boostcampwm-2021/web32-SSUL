import { UsingTechAs, UsingTechStack } from '../models/UsingTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { destructObject } from '@utils/Object';
import { GroupTechStackListDto } from '../dto/groupTechStackListDto';

@Service()
@EntityRepository(UsingTechStack)
export class UsingTechStackRepository extends Repository<UsingTechStack> {
  public findAll() {
    return this.find();
  }

  public async findUsingTechStackListByGroupId(groupId: number) {
    const groupTechStackJoinResult = await this.createQueryBuilder('using_tech_stack')
      .innerJoinAndSelect('using_tech_stack.techStack', 'tech_stack')
      .where('using_tech_stack.type = :type', { type: 'GROUP' })
      .andWhere('using_tech_stack.groupId = :groupId', { groupId })
      .getMany();

    return Promise.all(
      groupTechStackJoinResult.map((techStack) => {
        const { name } = destructObject(techStack) as GroupTechStackListDto;
        return name;
      }),
    );
  }

  public createUsingTechStack(usingTechStack: UsingTechStack) {
    return this.save(usingTechStack);
  }

  public async findUsingTechStackByProfileId(profileId: number,type: UsingTechAs): Promise<UsingTechStack[]> {
    return await this.createQueryBuilder('using_tech_stack')
      .innerJoinAndSelect('using_tech_stack.techStack', 'tech_stack')
      .where('using_tech_stack.type = :type', { type: type })
      .andWhere('using_tech_stack.profileId = :profileId', { profileId })
      .getMany();
  }
}
