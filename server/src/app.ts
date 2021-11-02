import 'reflect-metadata';
import * as express from 'express';
import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config({
  path: join(__dirname, '../.env'),
});

import indexRouter from './routes';

const app = express();

app.use(express.json());
app.use('/api', indexRouter);

const expressPort = 4000;

app.listen(expressPort);
