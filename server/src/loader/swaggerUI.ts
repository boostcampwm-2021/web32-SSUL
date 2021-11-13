import * as express from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { serve, setup } from 'swagger-ui-express';

export function serveSwaggerUI(app: express.Application) {
  const metadataStroage = getMetadataArgsStorage();
  const apiSpec = routingControllersToSpec(metadataStroage);
  app.use('/swagger-ui', serve, setup(apiSpec));
}
