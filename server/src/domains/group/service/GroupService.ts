import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { GroupTechStackRepository } from '@domains/techstack/repository/GroupTechStackRepository';

import { CreateGroupDto } from '../dto/request/CreateGroupDto';
import { GroupDetailResponse } from '../dto/response/GroupDetailResponse';

import { Group, GroupState } from '../models/Group';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';

import { GroupNotFoundError } from '../error/GroupNotFoundError';
import { GroupInvalidError } from '../error/GroupInvalidError';
import { DuplicateEnrollmentError } from '../error/DuplicateEnrollmentError';
import { NotAuthorizedError } from '@common/error/NotAuthorizedError';
import { ApplyGroupRepository } from '../repository/ApplyGroupRepository';
import { GroupAlreadyApplyError } from '../error/GroupAlreadyApplyError';
import { ApplyGroup, ApplyGroupState } from '../models/ApplyGroup';
import { GroupAlreadyJoinError } from '../error/GroupAlreadyJoinError';
import { GroupAlreadyDeclineError } from '../error/GroupAlreadyDecline';
import {
  FilteredGroup,
  FilteredPageGroupResponse,
} from '../dto/response/FilteredPageGroupResponse';
import { SimpleGroupCardResponse } from '../dto/response/SimpleGroupCardResponse';
import { OwnerGroupCardResponse } from '../dto/response/OwnerGroupCardResponse';
import { GroupActivityResponse } from '../dto/response/GroupActivityResponse';

const EACH_PAGE_CNT = 12;

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly groupEnrollmentRepository: GroupEnrollmentRepository,
    @InjectRepository()
    private readonly groupTechStackRepository: GroupTechStackRepository,
    @InjectRepository()
    private readonly applyGroupRepository: ApplyGroupRepository,
  ) {}

  public async getOwnSimpleGroups(userId: number): Promise<SimpleGroupCardResponse[]> {
    const groups = await this.groupRepository.findAllByOwnerId(userId);
    return groups.map((group) => SimpleGroupCardResponse.from(group));
  }

  public async getOwnGroups(userId: number): Promise<OwnerGroupCardResponse[]> {
    const groups = await this.groupRepository.findAllByOwnerId(userId);
    return groups.map((group) => OwnerGroupCardResponse.from(group));
  }

  public async getEndGroupList(userId: number) {
    const endGroupList = await this.groupEnrollmentRepository.findAllByUserIdAndGroupStatus(
      userId,
      GroupState.END,
    );
    return endGroupList.map((groupEnrollment) => GroupActivityResponse.from(groupEnrollment));
  }

  public async getGroupDetail(gid: number): Promise<GroupDetailResponse> {
    const groupDetail = await this.groupRepository.findOneById(gid);
    if (!groupDetail || !groupDetail.groupEnrollments.length) throw new GroupInvalidError();
    return GroupDetailResponse.from(groupDetail);
  }

  public async getfilteredPageGroups(
    page: number = 1,
    name: string = '',
    category: number,
    techstack: string,
  ): Promise<FilteredPageGroupResponse> {
    const inputTechStackNames = techstack ? techstack.split(',') : [];
    const offset = (page - 1) * EACH_PAGE_CNT;

    const groups =
      category === undefined
        ? await this.groupRepository.findAllByName(name)
        : await this.groupRepository.findAllByNameAndCategoryId(name, category);

    const filteredGroups: Group[] = inputTechStackNames.length
      ? groups.filter((group) => group.techStacks.some((t) => inputTechStackNames.includes(t.name)))
      : groups;

    const selectedPageGroups = filteredGroups
      .slice(offset, offset + EACH_PAGE_CNT)
      .map((group) => FilteredGroup.from(group));

    const totalPages: number = Math.ceil(filteredGroups.length / EACH_PAGE_CNT);

    return FilteredPageGroupResponse.from(selectedPageGroups, totalPages);
  }

  public async getGroupRole(groupId: number, userId: number) {
    // TODO : 타입만 가져오는 DTO 생성
    const enrollmentType = await this.groupEnrollmentRepository.findOneByGroupIdAndUserId(
      groupId,
      userId,
    );
    if (enrollmentType === undefined) await this.checkApplyGroup(groupId, userId);

    return enrollmentType;
  }

  public async getMyApplyedGroups(
    userId: number,
    state: ApplyGroupState,
  ): Promise<SimpleGroupCardResponse[]> {
    const applies = await this.applyGroupRepository.findAllByUserIdAndState(userId, state);
    const groups = applies.map((applyment) => SimpleGroupCardResponse.from(applyment.group));
    return groups;
  }

  public async getEnrolledGroupByQuery(
    userId: number,
    status: GroupState,
    type: GroupEnrollmentAs,
  ) {
    const enrollments = type
      ? await this.groupEnrollmentRepository.findAllByUserIdAndType(userId, type)
      : await this.groupEnrollmentRepository.findAllByUserId(userId);

    const groups = enrollments.map((enrollment) => enrollment.group);
    return status
      ? groups.filter((group) => group.status === status)
      : groups.map((group) => SimpleGroupCardResponse.from(group));
  }

  public async createGroup(createGroupDto: CreateGroupDto): Promise<void> {
    //TODO: transaction
    const { categoryId, ownerId } = createGroupDto;
    const group = await this.groupRepository.save(createGroupDto.toEntity(categoryId));
    const groupTechStacks: GroupTechStack[] = createGroupDto.techStacks.map((techStack) => {
      const groupTechStack = new GroupTechStack();
      groupTechStack.groupId = group.id;
      groupTechStack.techStackId = techStack.id;
      groupTechStack.name = techStack.name;
      return groupTechStack;
    });

    group.techStacks = await this.groupTechStackRepository.saveAll(groupTechStacks);
    await this.groupRepository.save(group);
    await this.enroll(group.id, ownerId, GroupEnrollmentAs.OWNER);
  }

  public async addApplyGroup(groupId: number, userId: number): Promise<ApplyGroup> {
    const applyGroupInfo: ApplyGroup = new ApplyGroup();
    applyGroupInfo.groupId = groupId;
    applyGroupInfo.userId = userId;
    applyGroupInfo.createdAt = new Date();
    const applyGroup = await this.applyGroupRepository.save(applyGroupInfo);
    return await this.applyGroupRepository.findOneOrFail({ id: applyGroup.id });
  }

  public async addGroupMentor(mentorId: number, groupId: number) {
    const group = await this.groupRepository.findOne({ id: groupId });

    if (group === undefined) {
      throw new GroupNotFoundError();
    }
    group.mentorId = mentorId;
    await this.groupRepository.save(group);
  }

  public async enroll(groupId: number, userId: number, type: GroupEnrollmentAs): Promise<Group> {
    const enrollment = await this.groupEnrollmentRepository.findOneByGroupIdAndUserId(
      groupId,
      userId,
    );
    if (enrollment !== undefined) {
      throw new DuplicateEnrollmentError();
    }
    const groupEnorllment = await this.groupEnrollmentRepository.save({ groupId, userId, type });
    return await this.groupRepository.findOneOrFail({ id: groupEnorllment.groupId });
  }

  public async checkGroupBelong(userId: number, groupId: number): Promise<void> {
    //TODO: findOrFail 을 사용하고 내부구현 감추기
    const enrollment = await this.groupEnrollmentRepository.findOne({ where: { groupId, userId } });
    if (!enrollment) throw new NotAuthorizedError();
  }

  public async checkGroupOwner(userId: number, groupId: number): Promise<void> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId, ownerId: userId },
    });
    if (!group) throw new NotAuthorizedError();
  }

  public async checkApplyGroup(groupId: number, userId: number): Promise<void> {
    const applyInfo = await this.applyGroupRepository.findOneByGroupIdAndUserId(groupId, userId);
    if (applyInfo?.state === ApplyGroupState.PENDING) throw new GroupAlreadyApplyError();
    else if (applyInfo?.state === ApplyGroupState.ACCEPTED) throw new GroupAlreadyJoinError();
    else if (applyInfo?.state === ApplyGroupState.DECLINED) throw new GroupAlreadyDeclineError();
  }
}
