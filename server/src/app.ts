import 'reflect-metadata';
import express from 'express';
import config from './config';
import loader from './loader';

async function main() {
  const app = express();
  await loader(app);

  app.listen(config.port, () => {
    console.log(`listening ${config.port}...`);
  });
}

main();
