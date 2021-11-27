import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class MentorNotFoundError extends BusinessLogicError {
  constructor() {
    super(400, `mentorId가 정확하지 않습니다.`, ErrorCode.MENTOR_NOT_FOUND);
  }
}
