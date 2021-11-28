import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class UserAlreadyMentorError extends BusinessLogicError {
  constructor(uid: number) {
    super(400, `User[id:${uid}] 는 이미 멘토유저입니다.`, ErrorCode.USER_ALREADY_MENTOR);
  }
}
