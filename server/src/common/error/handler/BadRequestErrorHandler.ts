import { BadRequestError, Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { ErrorResponse } from '../ErrorResponse';
import { logger } from '@utils/logger';

@Service()
@Middleware({ type: 'after' })
export class BadRequestErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    if (error instanceof BadRequestError) {
      logger.error(error.name);
      response.status(400).json(ErrorResponse.fromBadRequestError(error));
    } else {
      next(error);
    }
  }
}
