import { BusinessLogicError } from '@error/BusinessLogicError';
import { ErrorCode } from '@error/ErrorCode';

export class AlarmNotFoundError extends BusinessLogicError {
  constructor() {
    super(400, `Alarm not found`, ErrorCode.ALARM_NOT_FOUND);
  }
}
