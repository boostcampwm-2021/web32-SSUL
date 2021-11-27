import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { GroupTechStackRepository } from '@domains/techstack/repository/GroupTechStackRepository';
import { UserRepository } from '@domains/user/repository/UserRepository';

import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupDetailDto } from '../dto/groupDto';
import { GroupUserDto } from '@domains/user/dto/UserDto';

import { Group, GroupState } from '../models/Group';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { FilterdGroupDto, FilterdPageGroupDto } from '../dto/FilterdGroupDto';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';

import { destructObject } from '@utils/Object';
import { GroupNotFoundError } from '../error/GroupNotFoundError';
import { GroupInvalidError } from '../error/GroupInvalidError';
import { DuplicateEnrollmentError } from '../error/DuplicateEnrollmentError';
import { NotAuthorizedError } from '@common/error/NotAuthorizedError';
import { SimpleGroupCardResponse } from '../dto/SimpleGroupCardResponse';
import { ApplyGroupRepository } from '../repository/ApplyGroupRepository';
import { GroupAlreadyApplyError } from '../error/GroupAlreadyApplyError';
import { ApplyGroup, ApplyGroupState } from '../models/ApplyGroup';
import { GroupAlreadyJoinError } from '../error/GroupAlreadyJoinError';
import { GroupAlreadyDeclineError } from '../error/GroupAlreadyDecline';
import { OwnerGroupCardResponse } from '../dto/OwnerGroupCardResponse';

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

  public async getFilterdPageGroups(
    page: number = 1,
    name: string = '',
    category: number,
    techstack: string,
  ): Promise<FilterdPageGroupDto> {
    const totalFilterdGroups = await this.getFilterdGroups(name, category, techstack);
    const offset = (page - 1) * EACH_PAGE_CNT;
    const filterdPageGroups = totalFilterdGroups.slice(offset, offset + EACH_PAGE_CNT);
    const totalPages: number = Math.ceil(totalFilterdGroups.length / EACH_PAGE_CNT);

    return { groups: filterdPageGroups, totalPages };
  }

  public async getFilterdGroups(
    name: string,
    category: number,
    techstack: string,
  ): Promise<FilterdGroupDto[]> {
    const filterdTechStack = techstack ? techstack.split(',') : [];
    const groups =
      category !== undefined
        ? await this.groupRepository.findAllByNameAndCategory(name, category)
        : await this.groupRepository.findAllByName(name);

    const addedGroupsInfo: FilterdGroupDto[] = await this.addGrpupInfo(groups, filterdTechStack);
    return addedGroupsInfo;
  }

  public async getGroupDetails(gid: number): Promise<GroupDetailDto> {
    const groupDetails = await this.groupRepository.findGroupDetailByGroupId(gid);
    const groupEnrollments = groupDetails?.groupEnrollments.map((enrollment) =>
      destructObject(enrollment),
    ) as GroupUserDto[];
    if (!groupDetails || !groupEnrollments.length) throw new GroupInvalidError();
    const grupDetailData = { ...groupDetails, groupEnrollments } as unknown as GroupDetailDto;
    return grupDetailData;
  }

  public async addGrpupInfo(groups: Group[], filterdTechStack: string[]) {
    return Promise.all<any>(
      groups.map(async (group: Group) => {
        const groupsTechStacks = group.techStacks;
        const isIncludeStackList = group.techStacks.some((techStack) =>
          filterdTechStack.includes(techStack.name),
        );

        if (filterdTechStack.length === 0 || isIncludeStackList) {
          const newTechStackNames = groupsTechStacks.map((techstacks) => {
            return techstacks.name;
          });
          return {
            ...group,
            techStacks: newTechStackNames,
          };
        }
      }),
    ).then((data) => data.filter((group) => group !== undefined));
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

  public async getEndGroupList(userId: number) {
    const res = await this.groupRepository.findEndGroupByUserId(userId);

    return res.map(({ name, startAt, endAt }) => {
      return { name, startAt, endAt };
    });
  }

  public async addGroupMentor(mentorId: number, groupId: number) {
    const group = await this.groupRepository.findOne({ id: groupId });

    if (group === undefined) {
      throw new GroupNotFoundError();
    }
    group.mentorId = mentorId;
    await this.groupRepository.save(group);
  }

  public async enroll(groupId: number, userId: number, type: GroupEnrollmentAs) {
    const enrollment = await this.groupEnrollmentRepository.findOneByGroupIdAndUserId(
      groupId,
      userId,
    );
    if (enrollment !== undefined) {
      throw new DuplicateEnrollmentError();
    }
    await this.groupEnrollmentRepository.save({ groupId, userId, type });
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

  public async getOwnSimpleGroups(userId: number): Promise<SimpleGroupCardResponse[]> {
    const groups = await this.groupRepository.findAllByOwnerId(userId);
    return groups.map((group) => SimpleGroupCardResponse.from(group));
  }

  public async getOwnGroups(userId: number): Promise<OwnerGroupCardResponse[]> {
    const groups = await this.groupRepository.findAllByOwnerId(userId);
    return groups.map((group) => OwnerGroupCardResponse.from(group));
  }

  public async checkApplyGroup(groupId: number, userId: number): Promise<void> {
    const applyInfo = await this.applyGroupRepository.findOneByGroupIdAndUserId(groupId, userId);
    if (applyInfo?.state === ApplyGroupState.PENDING) throw new GroupAlreadyApplyError();
    else if (applyInfo?.state === ApplyGroupState.ACCEPTED) throw new GroupAlreadyJoinError();
    else if (applyInfo?.state === ApplyGroupState.DECLINED) throw new GroupAlreadyDeclineError();
  }

  public async addApplyGroup(groupId: number, userId: number): Promise<void> {
    const applyGroupInfo: ApplyGroup = new ApplyGroup();
    applyGroupInfo.groupId = groupId;
    applyGroupInfo.userId = userId;
    applyGroupInfo.createdAt = new Date();
    await this.applyGroupRepository.save(applyGroupInfo);
  }

  public async getGroupRole(groupId: number, userId: number) {
    const enrollmentType = await this.groupEnrollmentRepository.findTypeByGroupIdAndUserId(
      groupId,
      userId,
    );
    if (!enrollmentType) await this.checkApplyGroup(groupId, userId);

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
    enrollmentAs: GroupEnrollmentAs,
  ) {
    const enrollments = await this.groupEnrollmentRepository.findAllByUserIdAndType(
      userId,
      enrollmentAs,
    );
    return enrollments
      .map((enrollment) => SimpleGroupCardResponse.from(enrollment.group))
      .filter((group) => group.status === status);
  }
}
