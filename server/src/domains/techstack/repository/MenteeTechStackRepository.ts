import { TechStack } from '../models/TechStack';
import { MenteeTechStack } from '../models/MenteeTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';

@Service()
@EntityRepository(MenteeTechStack)
export class MenteeTechStackRepository extends Repository<MenteeTechStack> {
  public findAll() {
    return this.find();
  }

  public async deleteMenteeTechStackListByUserId(userId: number) {
    await this.delete({ userId });
  }

  public async createMenteeTechStack(menteeTechStack: MenteeTechStack) {
    await this.save(menteeTechStack);
  }
}
