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

  public async createMentorTechStack(mentorId: number, usingTechStacks: string[]) {
    usingTechStacks.forEach(async (techStackName) => {
      const techStack: TechStack = await this.techStackRepository.findOneOrFail({
        where: { name: techStackName },
      });
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
    return await this.mentorTechStackRepository.find({ where: { mentorId } });
  }

  public async updateMenteeTechStack(userInfo: User, techStacks: string[]) {
    await this.menteeTechStackRepository.deleteMenteeTechStackListByUserId(userInfo.id);

    techStacks.forEach(async (techStackName) => {
      const techStack: TechStack = await this.techStackRepository.findOneOrFail({
        where: { name: techStackName },
      });
      const menteeTechStack: MenteeTechStack = new MenteeTechStack();

      menteeTechStack.userId = userInfo.id;
      menteeTechStack.techStackId = techStack.id;
      menteeTechStack.name = techStack.name;

      await this.menteeTechStackRepository.createMenteeTechStack(menteeTechStack);
    });
  }
}
