import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { logger } from '@utils/logger';

@Service()
@Middleware({ type: 'after' })
export class ServerInternalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Error, request: any, response: any, next: (err: any) => any) {
    logger.error(error.stack);
    response.status(500).json({
      status: 500,
      message: '관리자에게 문의해주세요',
    });
  }
}
