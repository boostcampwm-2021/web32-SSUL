import * as express from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { serve, setup } from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { join } from 'path';

export function serveSwaggerUI(app: express.Application) {
  const metadataStroage = getMetadataArgsStorage();
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });

  const apiSpec = routingControllersToSpec(
    metadataStroage,
    {
      routePrefix: '/api',
      controllers: [join(__dirname, '../domains/**/api/*.ts')],
    },
    {
      components: { schemas },
      info: { title: 'SSUL-api', version: '0.1' },
    },
  );
  app.use('/swagger-ui', serve, setup(apiSpec));
}
