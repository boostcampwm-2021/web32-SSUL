import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class GroupAlreadyDeclineError extends BusinessLogicError {
  constructor() {
    super(400, `user is already decline that group`, ErrorCode.GROUP_ALREADY_DECLINED);
  }
}
