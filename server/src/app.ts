import 'reflect-metadata';
import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import loader from './loader';

async function main() {
  const app = express();
  await loader(app);

  const expressPort = 4000;

  app.listen(expressPort, () => {
    console.log(`listening ${expressPort}...`);
  });
}

main();
