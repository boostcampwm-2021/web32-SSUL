import {
  Body,
  Controller,
  Delete,
  Get,
  OnUndefined,
  Params,
  Patch,
  Post,
  QueryParams,
  Session,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';

import { GroupService } from '@domains/group/service/GroupService';
import { PostService } from '../service/PostService';

import { PostParam } from '../dto/PostParam';
import { GroupPostParam } from '../dto/GroupPostParam';
import { PostResponse } from '../dto/PostResponse';
import { PostContentDto } from '../dto/PostContentDto';
import { PostUpdateDto } from '../dto/PostUpdateDto';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { GroupParam } from '@domains/group/dto/param/GroupParam';

@OpenAPI({
  tags: ['게시글'],
})
@Service()
@Controller('/post')
export class PostController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
    @Inject()
    private readonly postService: PostService,
  ) {}

  @OpenAPI({ summary: '그룹 전체 게시글을 조회하는 API' })
  @ResponseSchema(PostResponse, { isArray: true })
  @Get('/:gid')
  @UseBefore(isLoggedIn)
  public async getPostsByGroupId(@Session() session: any, @Params() { gid }: GroupParam) {
    await this.groupService.checkGroupBelong(session.user.id, gid);
    return await this.postService.getPostsByGroupId(gid);
  }

  @OpenAPI({ summary: '그룹 게시글을 생성하는 API' })
  @Post('/')
  @UseBefore(isLoggedIn)
  @OnUndefined(200)
  public async createPost(@Session() session: any, @Body() postContent: PostContentDto) {
    const { id: userId } = session.user;
    const { groupId } = postContent;
    await this.groupService.checkGroupBelong(userId, groupId);
    return await this.postService.createPost(postContent.toEntity(userId));
  }

  @OpenAPI({ summary: '그룹 게시글을 수정하는 API' })
  @Patch('/')
  @UseBefore(isLoggedIn)
  @OnUndefined(200)
  public async updatePost(@Session() session: any, @Body() postUpdateDto: PostUpdateDto) {
    const { id: userId } = session.user;
    const { groupId } = postUpdateDto;
    await this.groupService.checkGroupBelong(userId, groupId);
    return await this.postService.updatePost(userId, postUpdateDto);
  }

  @OpenAPI({ summary: '그룹 게시글을 삭제하는 API' })
  @Delete('/')
  @UseBefore(isLoggedIn)
  @OnUndefined(200)
  public async deletePost(@Session() session: any, @QueryParams() { gid, pid }: GroupPostParam) {
    const { id: userId } = session.user;
    await this.groupService.checkGroupBelong(userId, gid);
    await this.postService.deletePost(userId, pid);
  }

  @OpenAPI({ summary: '그룹 게시글 조회수를 업데이트하는 API' })
  @Patch('/hit/:pid')
  @OnUndefined(200)
  public async increasePostHit(@Params() { pid }: PostParam) {
    await this.postService.increaseHit(pid);
  }
}
