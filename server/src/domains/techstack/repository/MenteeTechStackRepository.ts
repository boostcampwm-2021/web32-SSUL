import { MenteeTechStack } from '../models/MenteeTechStack';
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '@domains/user/models/User';
import { TechStack } from '../models/TechStack';

@Service()
@EntityRepository(MenteeTechStack)
export class MenteeTechStackRepository extends Repository<MenteeTechStack> {
  public findAll() {
    return this.find();
  }

  public async deleteAllByUserId(userId: number) {
    await this.delete({ userId });
  }

  public async saveAll(userId: number, techStackList: TechStack[]) {
    await Promise.all(
      techStackList.map((techStack) => {
        const menteeTechStack: MenteeTechStack = new MenteeTechStack();

        menteeTechStack.userId = userId;
        menteeTechStack.techStackId = techStack.id;
        menteeTechStack.name = techStack.name;

        this.save(menteeTechStack);
      }),
    );
  }
}
