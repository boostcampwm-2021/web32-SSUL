import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class InvalidGroupIdError extends BusinessLogicError {
  constructor() {
    super(400, `groupId is not correct`, ErrorCode.INVALID_GROUP_ID);
  }
}
