import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { GroupTechStackRepository } from '@domains/techstack/repository/GroupTechStackRepository';

import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupDetailDto } from '../dto/groupDto';
import { GroupUserDto } from '@domains/user/dto/UserDto';

import { Group } from '../models/Group';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { FilterdGroupDto, FilterdPageGroupDto } from '../dto/FilterdGroupDto';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';

import { destructObject } from '@utils/Object';
import { GroupNotFoundError } from '../error/GroupNotFoundError';
import { GroupInvalidError } from '../error/GroupInvalidError';
import { DuplicateEnrollmentError } from '../error/DuplicateEnrollmentError';

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
        ? await this.groupRepository.findGroupByNameAndCategory(name, category)
        : await this.groupRepository.findGroupByName(name);

    const addedGroupsInfo: FilterdGroupDto[] = await this.addGrpupInfo(groups, filterdTechStack);
    return addedGroupsInfo;
  }

  public async getGroupDetails(gid: number): Promise<GroupDetailDto> {
    const groupDetails = await this.groupRepository.findGroupDetailByGroupId(gid);
    const groupEnrollments = groupDetails?.groupEnrollments.map((enrollment) =>
      destructObject(enrollment),
    ) as GroupUserDto[];
    if (!groupDetails || !groupEnrollments.length) throw new GroupInvalidError();
    const grupDetailData = { ...groupDetails, groupEnrollments } as GroupDetailDto;
    return grupDetailData;
  }

  public async addGrpupInfo(groups: Group[], filterdTechStack: string[]) {
    return Promise.all<any>(
      groups.map(async (group: Group) => {
        const groupsTechStacks = group.techStacks;
        const { githubId, name, feverStack, avatarUrl } = group.ownerInfo;
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
            ownerGithubId: githubId,
            ownerName: name,
            ownerFeverStack: feverStack,
            ownerAvatarUrl: avatarUrl,
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
    this.groupRepository.save(group);
  }

  public async enroll(groupId: number, userId: number, type: GroupEnrollmentAs) {
    const enrollment = await this.groupEnrollmentRepository.findOne({ where: { groupId, userId } });
    if (enrollment !== undefined) {
      throw new DuplicateEnrollmentError();
    }
    await this.groupEnrollmentRepository.save({ groupId, userId, type });
  }
}
