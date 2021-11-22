import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { UserRepository } from '@domains/user/repository/UserRepository';
import { MentorRepository } from '../repository/MentorRepository';
import { MentoringRequestRepository } from '../repository/MentoringRequestRepository';

import { MentorInfoDto } from '../dto/MentorInfoDto';

import { Mentor } from '../models/Mentor';

import { UserIsNotMentorError } from '../error/UserIsNotMentorError';

@Service()
export class MentoringService {
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
    return await this.mentorRepository.save({ userId });
  }

  public async getMentorIdByUserId(userId: number): Promise<MentorInfoDto> {
    const mentor = await this.mentorRepository.findOne({ where: { userId } });
    if (!mentor) {
      throw new UserIsNotMentorError(userId);
    }
    return { mentorId: mentor.id };
  }

  public async getRequestListByMentorId(mentorId: number) {
    const results = await this.mentoringRequestRepository.findAllByMentorId(mentorId);

    return Promise.all<any>(
      results.map(async ({ id, group, createdAt }) => {
        const groupName = group.name;
        const groupId = group.id;
        const { imageUrl: categoryImage } = await this.categoryRepository.findOneOrFail({
          where: { id: group.categoryId },
        });
        const { name: ownerName } = await this.userRepository.findOneOrFail({
          where: { id: group.ownerId },
        });

        return { id, groupId, groupName, categoryImage, ownerName, createdAt };
      }),
    );
  }

  public async deleteRequest(requestId: number) {
    return await this.mentoringRequestRepository.delete({ id: requestId });
  }
}
