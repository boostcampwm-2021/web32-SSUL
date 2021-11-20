import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class DuplicateEnrollmentError extends BusinessLogicError {
  constructor() {
    super(400, `user is already registered in the group`, ErrorCode.DUP_ENROLLMENT);
  }
}
