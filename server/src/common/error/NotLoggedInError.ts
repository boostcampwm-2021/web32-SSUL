import { BusinessLogicError } from './BusinessLogicError';
import { ErrorCode } from './ErrorCode';

export class NotLoggedInError extends BusinessLogicError {
  constructor() {
    super(401, `User is not logged in`, ErrorCode.NOT_LOGGED_IN);
  }
}
