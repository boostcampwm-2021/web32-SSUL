import { ErrorSpec } from './ErrorSpec';

export class BusinessLogicError extends Error {
  httpCode: number;
  errorSpec: ErrorSpec;

  constructor(httpCode: number, message: string, errorSpec: ErrorSpec) {
    super(message);
    this.httpCode = httpCode;
    this.errorSpec = errorSpec;
  }
}
