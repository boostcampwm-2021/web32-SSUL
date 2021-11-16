import { BadRequestError, Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { ErrorResponse } from '../ErrorResponse';

@Service()
@Middleware({ type: 'after' })
export class BadRequestErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    if (error instanceof BadRequestError) {
      console.error(error);
      response.status(400).json(ErrorResponse.fromBadRequestError(error));
    } else {
      next(error);
    }
  }
}
