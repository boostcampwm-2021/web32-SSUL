import * as express from 'express';
import * as session from 'express-session';

const sessionConfig = {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
};

export default function (app: express.Application) {
  app.use(express.json());
  app.use(session(sessionConfig));
}
