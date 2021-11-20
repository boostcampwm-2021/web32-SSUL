import { Service } from 'typedi';
import { GroupRepository } from '../repository/GroupRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from '@domains/category/models/Category';
import { CategoryRepository } from '@domains/category/repository/CategoryRepository';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupDetailDto } from '../dto/groupDto';
import { Group } from '../models/Group';
import { FilterdGroupDto, FilterdPageGroupDto } from '../dto/FilterdGroupDto';
import { GroupUsingTechStackDto } from '@domains/techstack/dto/usingTechStackDto';
import { GroupUserDto } from '@domains/user/dto/UserDto';
import { destructObject } from '@utils/Object';
import { GroupNotFoundError } from '../error/GroupNotFoundError';
import { GroupEnrollmentRepository } from '../repository/GroupEnrollmentRepository';
import { DuplicateEnrollmentError } from '../error/DuplicateEnrollmentError';
import { GroupEnrollmentAs } from '../models/GroupEnrollment';
import { GroupTechStackRepository } from '@domains/techstack/repository/GroupTechStackRepository';

const EACH_PAGE_CNT = 12;

@Service()
export class GroupService {
  constructor(
    @InjectRepository()
    private readonly groupRepository: GroupRepository,
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository,
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
    console.log(groups[0].techStacks);
    const addedGroupsInfo: FilterdGroupDto[] = await this.addGrpupInfo(groups, filterdTechStack);
    return addedGroupsInfo;
  }

  public async getGroupDetails(gid: number): Promise<GroupDetailDto> {
    const groupDetails = await this.groupRepository.findGroupDetailByGroupId(gid);
    const groupEnrollments = groupDetails?.groupEnrollments.map((enrollment) =>
      destructObject(enrollment),
    ) as GroupUserDto[];
    const grupDetailData = { ...groupDetails, groupEnrollments } as GroupDetailDto;
    return grupDetailData;
  }

  public async addGrpupInfo(groups: Group[], filterdTechStack: string[]) {
    return Promise.all<any>(
      groups.map(async (group: Group) => {
        const groupsTechStacks = group.techStacks;
        const { githubId, name, feverStack, avatarUrl } = group.ownerInfo;
        const isIncludeStackList = group.techStacks.some((techStack) =>
          filterdTechStack.includes(String(techStack.techStackId)),
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

  // public async createGroup(createGroupDto: CreateGroupDto) {
  //   //TODO: transaction
  //   const { categoryId, ownerId } = createGroupDto;
  //   const category: Category = await this.categoryRepository.findOneOrFail(categoryId);
  //   const group: Group = createGroupDto.toEntity(categoryId);
  //   const createdGroup = await this.groupRepository.save(group);

  //   const groupTechStacks = createGroupDto.techStacks.map(techStack => {createdGroup.id, ...techStack});
  //   createdGroup.techStacks = await groupTechStackRepository.saveAll(groupTechStacks);

  //   await this.enroll(createdGroup.id, ownerId, GroupEnrollmentAs.OWNER);

  //   return createdGroup;
  // }

  public async getEndGroupList(userId: number) {
    const res = await this.groupRepository.findEndGroupByUserId(userId);

    return res.map(({ name, startAt, endAt }) => {
      return { name, startAt, endAt };
    });
  }

  // public async addGroupMentor(mentorId: number, groupId: number) {
  //   const group = await this.groupRepository.findOne({ id: groupId });

  //   if (group === undefined) {
  //     throw new GroupNotFoundError();
  //   }
  //   group.mentorId = mentorId;
  //   this.groupRepository.save(group);
  // }

  // public async enroll(groupId: number, userId: number, type: GroupEnrollmentAs) {
  //   const enrollment = await this.groupEnrollmentRepository.findOne({ where: { groupId, userId } });
  //   if (enrollment !== undefined) {
  //     throw new DuplicateEnrollmentError();
  //   }
  //   await this.groupEnrollmentRepository.save({ groupId, userId, type });
  // }
}
