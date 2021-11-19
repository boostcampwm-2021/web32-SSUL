import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class UserIsNotMentorError extends BusinessLogicError {
  constructor(uid: number) {
    super(400, `User[id:${uid}] is not Mentor user.`, ErrorCode.USER_NOT_MENTOR);
  }
}
