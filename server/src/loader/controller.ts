import * as express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { join } from 'path';
import { BusinessErrorHandler, BadRequestErrorHandler, ServerInternalErrorHandler } from '@common/error/handler';

export function setControllers(app: express.Application) {
  useContainer(Container);
  useExpressServer(app, {
    defaultErrorHandler: false,
    routePrefix: '/api',
    controllers: [join(__dirname, '../domains/**/api/*.ts')],
    // order of handlers is important
    middlewares: [BadRequestErrorHandler, BusinessErrorHandler, ServerInternalErrorHandler],
  });
}
