import * as express from 'express';
import database from './typeorm';
import server from './express';

export default async function (app: express.Application) {
  const connection = await database();
  console.log('DB connected');

  await server(app);
}
