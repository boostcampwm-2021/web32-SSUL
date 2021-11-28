import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class MentoringRequestNotFoundError extends BusinessLogicError {
  constructor() {
    super(400, `멘토링 요청 정보를 찾을 수 없습니다.`, ErrorCode.MENTORING_NOT_FOUND);
  }
}
