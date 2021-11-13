import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UsingTechStackRepository } from '../repository/UsingTechStackRepository';
import { Group } from '@domains/group/models/Group';
import { TechStack } from '../models/TechStack';
import { UsingTechAs, UsingTechStack } from '../models/UsingTechStack';
import { TechStackRepository } from '../repository/TechStackRepository';
import { Profile } from '@domains/user/models/Profile';

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

  public async getUserTechStack(profileId: number, type: UsingTechAs) {
    const res = await this.usingTechStackRepository.findUsingTechStackByProfileId(profileId, type);
    return res.map(({ techStack }) => techStack);
  }

  public async updateUserTechStack(profile: Profile, type: UsingTechAs, techStacks: string[]) {
    await this.usingTechStackRepository.deleteUsingTechStackByProfileId(profile.id, type);
    techStacks.forEach(async (techStackName) => {
      const techStack: TechStack = await this.techStackRepository.findOneOrFail({
        where: { name: techStackName },
      });
      const usingTechStack: UsingTechStack = new UsingTechStack();

      usingTechStack.profile = profile;
      usingTechStack.techStack = techStack;
      usingTechStack.type = type;

      this.usingTechStackRepository.createUsingTechStack(usingTechStack);
    });
  }
}
