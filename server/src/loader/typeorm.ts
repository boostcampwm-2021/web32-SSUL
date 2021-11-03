import { createConnection, ConnectionOptions, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import config from '../config';
import { join } from 'path';

export default async function () {
  useContainer(Container);

  const dbConfig: ConnectionOptions = {
    type: 'mysql',
    host: config.database.host,
    port: Number(config.database.port),
    database: config.database.dbname,
    username: config.database.username,
    password: config.database.password,
    synchronize: true,
    logging: true,
    entities: [join(__dirname, '../domains/**/models/*.ts')],
  };

  const connection = await createConnection(dbConfig);
  return connection;
}
