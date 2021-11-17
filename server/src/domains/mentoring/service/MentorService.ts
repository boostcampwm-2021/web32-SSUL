import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { GroupRepository } from '@domains/group/repository/GroupRepository';
import { UserRepository } from '@domains/user/repository/UserRepository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MentorInfoDto } from '../dto/MentorInfoDto';
import { DeleteRequestDto } from '../dto/DeleteRequestDto';
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
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
  ) {}

  public async createMentor(userId: number) {
    const mentor: Mentor = this.mentorRepository.create({ userId });
    return await this.mentorRepository.save(mentor);
  }

  public async getMentorIdByUserId(userId: number) {
    const mentor = await this.mentorRepository.findOne({ userId });

    if (mentor === undefined) return { isMentor: false, mentorId: -1 } as MentorInfoDto;
    else return { isMentor: true, mentorId: mentor.id } as MentorInfoDto;
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

  public async processingDeleteRequest(requestData: DeleteRequestDto) {
    if (requestData.accept) {
      const group = await this.groupRepository.findOneOrFail({ id: requestData.groupId });
      group.mentorId = requestData.mentorId;
      await this.groupRepository.save(group);
    }
    await this.mentoringRequestRepository.delete({ id: requestData.id });
  }
}
