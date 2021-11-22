import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class GroupNotInvolve extends BusinessLogicError {
  constructor() {
    super(400, `user is not registered in the group`, ErrorCode.GROUP_NOT_INVOLVE);
  }
}
