import 'reflect-metadata';
import * as express from 'express';
import { join } from 'path';

import * as dotenv from 'dotenv';
dotenv.config({
  path: join(__dirname, '../.env'),
});

const app = express();

app.use(express.json());

const expressPort = 4000;

app.listen(expressPort, () => {
  console.log(`listening ${expressPort}...`);
});
