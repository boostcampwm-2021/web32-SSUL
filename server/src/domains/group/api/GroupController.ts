import {
  Body,
  Controller,
  Get,
  OnUndefined,
  Param,
  Params,
  Patch,
  Post,
  QueryParam,
  Session,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';

import { GroupService } from '../service/GroupService';
import { PostService } from '../service/PostService';

import { GroupDetailDto, GroupParam } from '../dto/groupDto';
import { FilterdPageGroupDto } from '../dto/FilterdGroupDto';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupActivityDto } from '../dto/GroupActivityDto';
import { PostContentDto, PostDto, PostUpdateDto } from '../dto/PostDto';
import { SimpleGroupCardResponse } from '../dto/SimpleGroupCardResponse';
import { isLoggedIn } from '@common/middleware/isLoggedIn';

@OpenAPI({
  tags: ['그룹'],
})
@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly postService: PostService,
  ) {}

  @Get('/')
  @OnUndefined(200)
  @OpenAPI({
    summary: '필터링된 그룹을 조회하는 API',
    responses: {
      '200': {
        description: '그룹 조회 완료',
      },
    },
  })
  @ResponseSchema(FilterdPageGroupDto, { description: '필터링 그룹 조회 결과' })
  async getAll(
    @QueryParam('page') page: number,
    @QueryParam('name') name: string,
    @QueryParam('category') category: number,
    @QueryParam('techstack') techstack: string,
  ) {
    const filterdGroups: FilterdPageGroupDto = await this.groupService.getFilterdPageGroups(
      page,
      name,
      category,
      techstack,
    );
    return filterdGroups;
  }

  @Post('/')
  @OnUndefined(200)
  @OpenAPI({
    summary: '그룹을 생성하는 API',
  })
  async create(@Body() createGroupDto: CreateGroupDto) {
    await this.groupService.createGroup(createGroupDto);
  }

  @OpenAPI({ summary: '그룹활동 리스트를 가져오는 API' })
  @ResponseSchema(GroupActivityDto, { isArray: true })
  @Get('/activity/:uid')
  public async getGroupActivity(@Param('uid') userId: number) {
    return await this.groupService.getEndGroupList(userId);
  }

  @Get('/own')
  @UseBefore(isLoggedIn)
  @ResponseSchema(SimpleGroupCardResponse, { isArray: true })
  @OpenAPI({ summary: '내가 만든 그룹 목록을 가져오는 API' })
  public async getMyGroups(@Session() session: any) {
    return await this.groupService.getOwnGroups(session.user.id);
  }

  @Get('/:gid')
  @OpenAPI({ summary: '그룹 정보를 가져오는 API' })
  @ResponseSchema(GroupDetailDto, { description: '그룹 정보 조회 완료' })
  async getGroupData(@Param('gid') gid: number) {
    return await this.groupService.getGroupDetails(gid);
  }

  @OpenAPI({ summary: '그룹 전체 게시글을 조회하는 API' })
  @ResponseSchema(PostDto, { isArray: true })
  @Get('/post/:gid')
  @UseBefore(isLoggedIn)
  public async getPostsByGroupId(@Session() session: any, @Params() { gid }: GroupParam) {
    const { id: userid } = session.user;
    await this.groupService.checkGroupBelong(userid, gid);
    return await this.postService.getPostsByGroupId(gid);
  }

  @OpenAPI({ summary: '그룹 게시글을 생성하는 API' })
  @Post('/post')
  @UseBefore(isLoggedIn)
  @OnUndefined(200)
  public async createPost(@Session() session: any, @Body() postContent: PostContentDto) {
    const { id: userId } = session.user;
    const { groupId } = postContent;
    await this.groupService.checkGroupBelong(userId, groupId);
    await this.postService.createPost(postContent.toEntity(userId));
  }

  @OpenAPI({ summary: '그룹 게시글을 수정하는 API' })
  @Patch('/post')
  @UseBefore(isLoggedIn)
  @OnUndefined(200)
  public async updatePost(@Session() session: any, @Body() postContent: PostUpdateDto) {
    const { id: userId } = session.user;
    const { groupId } = postContent;
    await this.groupService.checkGroupBelong(userId, groupId);
    await this.postService.updatePost(userId, postContent);
  }
}
