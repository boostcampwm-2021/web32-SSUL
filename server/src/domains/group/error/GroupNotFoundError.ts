import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class GroupNotFoundError extends BusinessLogicError {
  constructor() {
    super(400, `groupId is not correct`, ErrorCode.GROUP_NOT_FOUND);
  }
}
