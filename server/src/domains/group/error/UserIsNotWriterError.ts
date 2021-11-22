import { BusinessLogicError } from '../../../common/error/BusinessLogicError';
import { ErrorCode } from '../../../common/error/ErrorCode';

export class UserIsNotWriterError extends BusinessLogicError {
  constructor() {
    super(403, `User is not writer`, ErrorCode.USER_NOT_WRITER);
  }
}
