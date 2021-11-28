import { BusinessLogicError } from './BusinessLogicError';
import { ErrorCode } from './ErrorCode';

export class ForbiddenAccessError extends BusinessLogicError {
  constructor() {
    super(403, `Forbidden Access.`, ErrorCode.FORBIDDEN_ACCCES);
  }
}
