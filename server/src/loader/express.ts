import express from 'express';
import session from 'express-session';
import config from '../config';
import morgan from 'morgan';
import { stream } from '@utils/logger';
import cookieSession from 'cookie-session';

const httpLogFormat = ':remote-addr - :remote-user ":method :url" :status :res[content-length]';
export default function (app: express.Application) {
  const sessionConfig = {
    secret: config.session as string,
    resave: false,
    saveUninitialized: true,
  };

  if (config.mode === 'test') {
    console.log('cookie-session mode');
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.session as string],
      }),
    );
  } else {
    console.log('server-session mode');
    app.use(session(sessionConfig));
  }
  app.use(express.json());
  app.use(morgan(httpLogFormat, { stream }));
}
