import { BusinessLogicError } from './BusinessLogicError';
import { ValidationError } from 'class-validator';
import { ErrorSpec } from './ErrorSpec';
import { ErrorCode } from './ErrorCode';

type BadRequestError = {
  httpCode: number;
  message: string;
  errors: ValidationError[];
};

export class ErrorResponse {
  errors: ValidationError[];
  status: number;
  errorSpec: ErrorSpec;

  private constructor(status: number, errorSpec: ErrorSpec, errors?: ValidationError[]) {
    this.status = status;
    this.errorSpec = errorSpec;
    this.errors = errors ?? [];
  }

  static fromBusniessLogicError(error: BusinessLogicError): ErrorResponse {
    const { httpCode, errorSpec } = error;
    return new ErrorResponse(httpCode, errorSpec);
  }

  static fromBadRequestError(error: any): ErrorResponse {
    const { httpCode } = error;
    const errorSpec = ErrorCode.BAD_REQUEST;
    return new ErrorResponse(httpCode, errorSpec, error.errors);
  }
}
