import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { UserRepository } from '@domains/user/repository/UserRepository';
import { MentorRepository } from '../repository/MentorRepository';
import { MentoringRequestRepository } from '../repository/MentoringRequestRepository';

import { MentorInfoDto } from '../dto/MentorInfoDto';

import { Mentor } from '../models/Mentor';

import { UserIsNotMentorError } from '../error/UserIsNotMentorError';
import { UserAlreadyMentorError } from '../error/UserAlreadyMentorError';
import { MentoringRequestResponse } from '../dto/MentoringRequestResponse';
import { MentorAlreadyRequestError } from '../error/MentorAlreadyRequestError';
import { GroupRepository } from '@domains/group/repository/GroupRepository';
import { MentorNotFoundError } from '../error/MentorNotFoundError';
import { MentoringRequestNotFoundError } from '../error/MentoringRequestNotFoundError';
import { MentoringRequest } from '../models/MentoringRequest';

const EACH_PAGE_CNT = 12;
const DEFAULT_PAGE_NUM = 1;

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
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
  ) {}

  public async createMentor(userId: number) {
    const mentor = await this.mentorRepository.findOneByUserId(userId);
    if (mentor !== undefined) {
      throw new UserAlreadyMentorError(userId);
    }
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

  public async getAllRequestList(): Promise<MentoringRequestResponse[]> {
    const mentoringRequests = await this.mentoringRequestRepository.findAll();
    return mentoringRequests.map((mentoringRequest) =>
      MentoringRequestResponse.from(mentoringRequest),
    );
  }

  public async deleteRequest(requestId: number) {
    const mentoringRequest = await this.mentoringRequestRepository.findOneOrFail({ id: requestId });
    await this.mentoringRequestRepository.delete({ id: requestId });
    return mentoringRequest;
  }

  public async getFilterdPageMentorList(
    page: number = DEFAULT_PAGE_NUM,
    name: string = '',
    techstack: string = '',
  ) {
    const nameFilterdAllMentor = await this.mentorRepository.findAllByName(name);
    const techStackFilterdAllMentor = this.filterdBytechStacks(nameFilterdAllMentor, techstack);
    const offset = (page - 1) * EACH_PAGE_CNT;
    const filterdPageMentors = techStackFilterdAllMentor.slice(offset, offset + EACH_PAGE_CNT);
    const totalPages: number = Math.ceil(filterdPageMentors.length / EACH_PAGE_CNT);
    return { mentors: filterdPageMentors, totalPages };
  }

  public filterdBytechStacks(mentors: Mentor[], filterdTechstack: string) {
    if (!filterdTechstack) return mentors;
    const filterdTechstacks = filterdTechstack.split(',');
    return mentors
      .map((mentor) => {
        const mentorTechStacks = mentor.techStacks;
        const isIncludeTechStackList = mentorTechStacks.some((techstack) =>
          filterdTechstacks.includes(techstack.name),
        );
        if (isIncludeTechStackList) return mentor;
      })
      .filter((mentor) => mentor);
  }

  public async validateMentorAndGroup(mentorId: number, groupId: number) {
    const mentor = await this.mentorRepository.findOneById(mentorId);
    if (!mentor) throw new MentorNotFoundError();

    await this.groupRepository.findOneOrFailById(groupId);
  }

  public async saveMentoringRequest(mentorId: number, groupId: number): Promise<MentoringRequest> {
    await this.validateMentorAndGroup(mentorId, groupId);

    const mentoringRequest = await this.mentoringRequestRepository.findOneByMentorIdAndGroupId(
      mentorId,
      groupId,
    );
    if (mentoringRequest) throw new MentorAlreadyRequestError();

    const mentor = new Mentor();
    mentor.id = mentorId;
    const group = new Mentor();
    group.id = groupId;
    const createdAt = new Date();

    const queryResult = await this.mentoringRequestRepository.save({
      createdAt,
      mentor,
      group,
    });
    return await this.mentoringRequestRepository.findOneOrFail({
      where: { id: queryResult.id },
    });
  }

  public async cancelMentoringRequest(mentorId: number, groupId: number) {
    await this.validateMentorAndGroup(mentorId, groupId);

    const mentoringRequest = await this.mentoringRequestRepository.findOneByMentorIdAndGroupId(
      mentorId,
      groupId,
    );
    if (!mentoringRequest) throw new MentoringRequestNotFoundError();

    return await this.mentoringRequestRepository.deleteByMentorIdAndGroupId(mentorId, groupId);
  }
}
