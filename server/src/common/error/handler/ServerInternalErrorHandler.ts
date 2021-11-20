import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { logger } from '@utils/logger';

@Service()
@Middleware({ type: 'after' })
export class ServerInternalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log(error);
    logger.error(error.message);
    response.status(500).json({
      status: 500,
      message: '관리자에게 문의해주세요',
    });
  }
}
