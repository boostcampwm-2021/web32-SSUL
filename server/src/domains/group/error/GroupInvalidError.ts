import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class GroupInvalidError extends BusinessLogicError {
  constructor() {
    super(400, `group isn't valid`, ErrorCode.GROUP_INVALID);
  }
}
