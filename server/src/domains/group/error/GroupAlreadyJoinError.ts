import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class GroupAlreadyJoinError extends BusinessLogicError {
  constructor() {
    super(400, `user is already join that group`, ErrorCode.GROUP_ALREADY_JOIN);
  }
}
