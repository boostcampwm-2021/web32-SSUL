import {
  Controller,
  Patch,
  QueryParam,
  Session,
  SessionParam,
  OnUndefined,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
@Controller('/user')
export class UserController {
  @Patch('/role')
  @OnUndefined(200)
  async patchRole(
    @Session() session: any,
    @SessionParam('githubId') githubId: string,
    @SessionParam('role') role: string,
  ) {
    if (!githubId) return;
    session.role = role === 'MENTEE' ? 'MENTOR' : 'MENTEE';
  }
}
