import * as express from 'express';
import database from './typeorm';
import server from './express';
import controller from './controller';

export default async function (app: express.Application) {
  const connection = await database();
  console.log('DB connected');

  controller(app);
  console.log('controller loaded');
  await server(app);
}
