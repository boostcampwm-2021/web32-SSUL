import {
  Controller,
  Delete,
  Get,
  OnUndefined,
  Params,
  Patch,
  Post,
  Session,
  UseBefore,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { isLoggedIn } from '@common/middleware/isLoggedIn';
import { AlarmService } from '../service/AlarmService';
import { AlarmListResponse } from '../dto/AlarmResponse';
import { AlarmParams } from '../dto/AlarmParams';

@OpenAPI({ tags: ['알림'] })
@Service()
@Controller('/alarm')
export class AlarmController {
  constructor(
    @Inject()
    private readonly alarmService: AlarmService,
  ) {}

  @Get('/:uid')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @ResponseSchema(AlarmListResponse, { isArray: true, description: '알림 목록 조회 성공' })
  @OpenAPI({ summary: '사용자의 알림 목록을 조회하는 API' })
  async getAlarms(@Session() session: any) {
    return await this.alarmService.getAlarms(session.user.id);
  }

  @Post('/:uid')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({ summary: '알림을 추가하는 API' })
  async postAlarm(@Session() session: any) {}

  @Patch('/:aid')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({ summary: '알림을 읽음 처리하는 API' })
  async readAlarm(@Params() { aid }: AlarmParams) {}

  @Delete('/:aid')
  @OnUndefined(200)
  @UseBefore(isLoggedIn)
  @OpenAPI({ summary: '알림을 삭제하는 API' })
  async deleteAlarm(@Params() { aid }: AlarmParams) {}
}
