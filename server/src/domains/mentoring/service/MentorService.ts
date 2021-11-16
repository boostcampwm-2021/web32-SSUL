import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { UserRepository } from '@domains/user/repository/UserRepository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Mentor } from '../models/Mentor';
import { MentoringRequestRepository } from '../repository/MentoringRequestRepository';
import { MentorRepository } from '../repository/MentorRepository';

@Service()
export class MentorService {
  constructor(
    @InjectRepository()
    private readonly mentorRepository: MentorRepository,
    @InjectRepository()
    private readonly mentoringRequestRepository: MentoringRequestRepository,
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository()
    private readonly userRepository: UserRepository,
  ) {}

  public async createMentor(userId: number) {
    const mentor: Mentor = this.mentorRepository.create({ userId: userId });
    return await this.mentorRepository.save(mentor);
  }

  public async getRequestListByMentorId(mentorId: number) {
    const results = await this.mentoringRequestRepository.findAllByMentorId(mentorId);

    return Promise.all<any>(
      results.map(async ({ group, createdAt }) => {
        const groupName = group.name;

        const { imageUrl: categoryImage } = await this.categoryRepository.findOneOrFail({
          where: { id: group.categoryId },
        });

        const { name: ownerName } = await this.userRepository.findOneOrFail({
          where: { id: group.ownerId },
        });

        return { groupName, categoryImage, ownerName, createdAt };
      }),
    );
  }
}
