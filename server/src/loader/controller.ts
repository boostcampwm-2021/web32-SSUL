import * as express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { join } from 'path';

export default function (app: express.Application) {
  useContainer(Container);
  useExpressServer(app, {
    routePrefix: '/api',
    controllers: [join(__dirname, '../domains/**/api/*.ts')],
  });
}
