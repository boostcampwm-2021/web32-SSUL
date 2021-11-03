import * as express from 'express';

export default function (app: express.Application) {
  app.use(express.json());
}
