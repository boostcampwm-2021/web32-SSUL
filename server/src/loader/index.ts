import express from 'express';
import typeorm from './typeorm';
import server from './express';
import { setControllers } from './controller';
import { serveSwaggerUI } from './swaggerUI';

export default async function (app: express.Application) {
  await typeorm();
  console.log('DB connected');

  await server(app);
  console.log('express app use loaded.');

  await setControllers(app);
  console.log('Controller loaded.');

  serveSwaggerUI(app);
  console.log('swagger ui served.');
}
