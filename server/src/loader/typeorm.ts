import { seedWithConnection } from '@utils/seed';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import config from '../config';
import { ormConfig } from '../config/ormconfig';

export default async function () {
  useContainer(Container);
  const connection = await createConnection(ormConfig[config.mode]);
  if (config.mode === 'test') {
    await seedWithConnection(connection);
  }
  return connection;
}
