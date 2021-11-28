import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { ErrorResponse } from '../ErrorResponse';
import { BusinessLogicError } from '../BusinessLogicError';
import { logger } from '@utils/logger';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Service()
@Middleware({ type: 'after' })
export class BusinessLogicErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    if (error instanceof BusinessLogicError) {
      logger.error(`[CODE:${error.errorSpec.code}] ${error.name} ${error.message}`);
      console.log(error);
      response.status(error.httpCode).send(ErrorResponse.fromBusniessLogicError(error));
    } else if (error instanceof EntityNotFoundError) {
      logger.error(error);
      response.status(400).send(ErrorResponse.fromEntityNotFoundError(error));
    } else {
      next(error);
    }
  }
}
