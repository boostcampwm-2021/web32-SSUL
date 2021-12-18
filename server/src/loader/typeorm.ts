import { seedWithConnection } from '@utils/seed';
import { createConnection, getConnectionManager, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import config from '../config';
import { ormConfig } from '../config/ormconfig';

export default async function () {
  useContainer(Container);
  if (!getConnectionManager().has('default')) {
    const connection = await createConnection(ormConfig[config.mode]);
    if (config.mode === 'test') {
      await seedWithConnection(connection);
    }
  } else {
    console.log('default exist');
  }
}
