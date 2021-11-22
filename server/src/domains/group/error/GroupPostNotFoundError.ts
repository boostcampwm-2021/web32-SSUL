import { BusinessLogicError } from '../../../common/error/BusinessLogicError';
import { ErrorCode } from '../../../common/error/ErrorCode';

export class GroupPostNotFoundError extends BusinessLogicError {
  constructor() {
    super(400, `Post is not found`, ErrorCode.GROUP_POST_NOT_FOUND);
  }
}
