import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class GroupAlreadyApplyError extends BusinessLogicError {
  constructor() {
    super(400, `user is already apply that group`, ErrorCode.GROUP_ALREADY_APPLY);
  }
}
