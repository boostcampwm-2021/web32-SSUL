import { GroupTechStack } from '../models/GroupTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(GroupTechStack)
export class GroupTechStackRepository extends Repository<GroupTechStack> {
  public findAll() {
    return this.find();
  }
  public async saveAll(groupTechStacks: GroupTechStack[]): Promise<GroupTechStack[]> {
    return await Promise.all(groupTechStacks.map((groupTechStack) => this.save(groupTechStack)));
  }
}
