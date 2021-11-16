import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { ErrorResponse } from '../ErrorResponse';
import { BusinessLogicError } from '../BusinessLogicError';

@Service()
@Middleware({ type: 'after' })
export class BusinessLogicErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.error(error);
    if (error instanceof BusinessLogicError) {
      response.status(error.httpCode).send(ErrorResponse.fromBusniessLogicError(error));
    } else {
      next(error);
    }
  }
}
