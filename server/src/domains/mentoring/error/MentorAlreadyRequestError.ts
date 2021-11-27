import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class MentorAlreadyRequestError extends BusinessLogicError {
  constructor() {
    super(400, `이미 멘토링 신청을 한 상태입니다.`, ErrorCode.MENTORING_ALREADY_REQUEST);
  }
}
