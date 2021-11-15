import express from 'express';
import session from 'express-session';
import config from '../config';
import morgan from 'morgan';

export default function (app: express.Application) {
  const sessionConfig = {
    secret: config.session as string,
    resave: false,
    saveUninitialized: true,
  };

  app.use(express.json());
  app.use(session(sessionConfig));
  app.use(morgan('dev'));
}
