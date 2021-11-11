import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UsingTechStackRepository } from '../repository/UsingTechStackRepository';
import { Group } from '@domains/group/models/Group';
import { TechStack } from '../models/TechStack';
import { UsingTechAs, UsingTechStack } from '../models/UsingTechStack';
import { TechStackRepository } from '../repository/TechStackRepository';

@Service()
export class UsingTechStackService {
  constructor(
    @InjectRepository()
    private readonly usingTechStackRepository: UsingTechStackRepository,
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
  ) {}

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
