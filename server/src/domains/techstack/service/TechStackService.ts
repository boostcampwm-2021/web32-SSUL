import { Service } from 'typedi';
import { TechStackRepository } from '../repository/TechStackRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TechStack } from '../models/TechStack';
import { MentorTechStack } from '../models/MentorTechStack';
import { MenteeTechStack } from '../models/MenteeTechStack';
import { MentorTechStackRepository } from '../repository/MentorTechStackRepository';
import { MenteeTechStackRepository } from '../repository/MenteeTechStackRepository';
import { User } from '@domains/user/models/User';

@Service()
export class TechStackService {
  constructor(
    @InjectRepository()
    private readonly techStackRepository: TechStackRepository,
    @InjectRepository()
    private readonly mentorTechStackRepository: MentorTechStackRepository,
    @InjectRepository()
    private readonly menteeTechStackRepository: MenteeTechStackRepository,
  ) {}

  public async getTechStackList() {
    return await this.techStackRepository.findAll();
  }

  public async createMentorTechStack(mentorId: number, usingTechStacks: TechStack[]) {
    usingTechStacks.forEach(async (techStack) => {
      const mentorTechStack: MentorTechStack = new MentorTechStack();

      mentorTechStack.mentorId = mentorId;
      mentorTechStack.techStackId = techStack.id;
      mentorTechStack.name = techStack.name;

      this.mentorTechStackRepository.save(mentorTechStack);
    });
  }

  public async getMenteeTechStack(userId: number) {
    return await this.menteeTechStackRepository.find({ where: { userId } });
  }

  public async getMentorTechStack(mentorId: number) {
    const mentorTechStackList = await this.mentorTechStackRepository.find({ where: { mentorId } });

    return mentorTechStackList.map((mentorTechStack) => {
      return {
        id: mentorTechStack.techStackId,
        name: mentorTechStack.name,
      };
    });
  }

  public async updateMenteeTechStack(userInfo: User, techStacks: TechStack[]) {
    await this.menteeTechStackRepository.deleteMenteeTechStackListByUserId(userInfo.id);

    techStacks.forEach(async (techStack) => {
      const menteeTechStack: MenteeTechStack = new MenteeTechStack();

      menteeTechStack.userId = userInfo.id;
      menteeTechStack.techStackId = techStack.id;
      menteeTechStack.name = techStack.name;

      await this.menteeTechStackRepository.createMenteeTechStack(menteeTechStack);
    });
  }
}
