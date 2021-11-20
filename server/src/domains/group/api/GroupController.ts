import { Body, Controller, Get, OnUndefined, Param, Post, QueryParam } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupService } from '../service/GroupService';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { FilterdPageGroupDto } from '../dto/FilterdGroupDto';
import { GroupActivityDto } from '../dto/GroupActivityDto';
import { GroupDetailDto } from '../dto/groupDto';

@OpenAPI({
  tags: ['그룹'],
})
@Service()
@Controller('/group')
export class GroupController {
  constructor(
    @Inject()
    private readonly groupService: GroupService,
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
    //
    const startDate = new Date();
    const filterdGroups: FilterdPageGroupDto = await this.groupService.getFilterdPageGroups(
      page,
      name,
      category,
      techstack,
    );
    //
    const endDate = new Date();
    console.log(endDate.getTime() - startDate.getTime());
    return filterdGroups;
  }

  @Get('/:gid')
  @OpenAPI({ summary: '그룹 정보를 가져오는 API' })
  @ResponseSchema(GroupDetailDto, { description: '그룹 정보 조회 완료' })
  async getGroupData(@Param('gid') gid: number) {
    return this.groupService.getGroupDetails(gid);
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
}
