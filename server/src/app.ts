import 'reflect-metadata';
import express from 'express';
import config from './config';
import loader from './loader';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  async run() {
    await loader(this.app);
    this.app.listen(config.port, () => {
      console.log(`listening ${config.port}...`);
    });
  }

  async getInstance() {
    await loader(this.app);
    return this.app;
  }
}

export default new App();
