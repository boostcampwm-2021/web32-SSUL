import { Service } from 'typedi';
import { TechStackRepository } from '../repository/TechStackRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Group } from '@domains/group/models/Group';
import { TechStack } from '../models/TechStack';
import { UsingTechAs, UsingTechStack } from '../models/UsingTechStack';
import { UsingTechStackRepository } from '../repository/UsingTechStackRepository';

@Service()
export class TechStackService {
  constructor(
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
    @InjectRepository()
    private readonly usingTechStackRepository: UsingTechStackRepository,
  ) {}

  public async getTechStackList() {
    const techStackList = await this.techStackRepository.findAll();
    return techStackList;
  }
  public async createGroupUsingStack(createdGroup: Group, usingTechStacks: string[]) {
    usingTechStacks.forEach(async (techStackName) => {
      const techStack: TechStack = await this.techStackRepository.findOneOrFail({
        where: { name: techStackName },
      });
      const usingTechStack: UsingTechStack = new UsingTechStack();

      usingTechStack.group = createdGroup;
      usingTechStack.techStack = techStack;
      usingTechStack.type = UsingTechAs.GROUP;

      this.usingTechStackRepository.createUsingTechStack(usingTechStack);
    });
  }
}
