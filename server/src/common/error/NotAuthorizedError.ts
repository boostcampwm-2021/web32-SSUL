import { BusinessLogicError } from './BusinessLogicError';
import { ErrorCode } from './ErrorCode';

export class NotAuthorizedError extends BusinessLogicError {
  constructor() {
    super(401, `User is not authorized`, ErrorCode.NOT_AUTHORIZED);
  }
}
