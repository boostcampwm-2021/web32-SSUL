import { createConnection, useContainer, ConnectionOptions } from 'typeorm';
import Container from 'typedi';
import config from '../config';

export default async function () {
  const dbConfig: ConnectionOptions = {
    type: 'mysql',
    host: config.database.host,
    port: Number(config.database.port),
    database: config.database.dbname,
    username: config.database.username,
    password: config.database.password,
    synchronize: true,
    logging: true,
    entities: ['../domains/**/models/*.ts'],
  };

  useContainer(Container);

  const connection = await createConnection(dbConfig);
  return connection;
}
