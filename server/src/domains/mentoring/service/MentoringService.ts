import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { UserRepository } from '@domains/user/repository/UserRepository';
import { MentorRepository } from '../repository/MentorRepository';
import { MentoringRequestRepository } from '../repository/MentoringRequestRepository';

import { Mentor } from '../models/Mentor';
import { Group } from '@domains/group/models/Group';

import { UserIsNotMentorError } from '../error/UserIsNotMentorError';
import { UserAlreadyMentorError } from '../error/UserAlreadyMentorError';
import { MentorAlreadyRequestError } from '../error/MentorAlreadyRequestError';
import { GroupRepository } from '@domains/group/repository/GroupRepository';
import { MentorNotFoundError } from '../error/MentorNotFoundError';
import { MentoringRequestNotFoundError } from '../error/MentoringRequestNotFoundError';
import { MentoringRequest } from '../models/MentoringRequest';
import { MentoringRequestResponse } from '../dto/response/MentoringRequestResponse';
import { AllMentoringRequestResponse } from '../dto/response/AllMentoringRequestResponse';
import { MentorInfoResponse } from '../dto/response/MentorInfoResponse';

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

  public async getMentorIdByUserId(userId: number): Promise<MentorInfoResponse> {
    const mentor = await this.mentorRepository.findOne({ where: { userId } });
    if (!mentor) {
      throw new UserIsNotMentorError(userId);
    }
    return { mentorId: mentor.id };
  }

  public async getRequestListByMentorId(mentorId: number) {
    const mentoringRequests = await this.mentoringRequestRepository.findAllByMentorId(mentorId);
    return mentoringRequests.map((request) => MentoringRequestResponse.from(request));
  }

  public async getAllRequestList(): Promise<AllMentoringRequestResponse[]> {
    const mentoringRequests = await this.mentoringRequestRepository.findAll();
    return mentoringRequests.map((mentoringRequest) =>
      AllMentoringRequestResponse.from(mentoringRequest),
    );
  }

  public async deleteRequest(requestId: number) {
    const mentoringRequest = await this.mentoringRequestRepository.findOneOrFail({ id: requestId });
    await this.mentoringRequestRepository.delete({ id: requestId });
    return mentoringRequest;
  }

  public async getfilteredPageMentorList(
    page: number = DEFAULT_PAGE_NUM,
    name: string = '',
    techstack: string = '',
  ) {
    const namefilteredAllMentor = await this.mentorRepository.findAllByName(name);
    const techStackfilteredAllMentor = this.filteredByTechStacks(namefilteredAllMentor, techstack);
    const offset = (page - 1) * EACH_PAGE_CNT;
    const filteredPageMentors = techStackfilteredAllMentor.slice(offset, offset + EACH_PAGE_CNT);
    const totalPages: number = Math.ceil(filteredPageMentors.length / EACH_PAGE_CNT);
    return { mentors: filteredPageMentors, totalPages };
  }

  public filteredByTechStacks(mentors: Mentor[], filteredTechstack: string) {
    if (!filteredTechstack) return mentors;
    const filteredTechstacks = filteredTechstack.split(',');
    return mentors
      .map((mentor) => {
        const mentorTechStacks = mentor.techStacks;
        const isIncludeTechStackList = mentorTechStacks.some((techstack) =>
          filteredTechstacks.includes(techstack.name),
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
    const group = new Group();
    const createdAt = new Date();

    mentor.id = mentorId;
    group.id = groupId;

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
