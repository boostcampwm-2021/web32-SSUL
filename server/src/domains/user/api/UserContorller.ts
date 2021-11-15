import {
  Controller,
  Patch,
  QueryParam,
  Session,
  SessionParam,
  OnUndefined,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@OpenAPI({ tags: ['사용자'] })
@Service()
@Controller('/user')
export class UserController {
  @Patch('/role')
  @OnUndefined(200)
  @OpenAPI({
    summary: '사용자 역할 상태를 변경시키는 API',
    responses: {
      '200': {
        description: '역할 변경 성공',
      },
    },
  })
  async patchRole(
    @Session() session: any,
    @SessionParam('githubId') githubId: string,
    @SessionParam('role') role: string,
  ) {
    if (!githubId) return;
    session.role = role === 'MENTEE' ? 'MENTOR' : 'MENTEE';
  }
}
