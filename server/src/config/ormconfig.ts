import config from './index';
import { join } from 'path';

interface OrmConfig {
  [key: string]: any;
}

export const ormConfig: OrmConfig = {
  dev: {
    type: 'mysql',
    host: config.database.host,
    port: 3306,
    database: config.database.dbname ?? 'ssul-local',
    username: config.database.username,
    password: config.database.password,
    synchronize: true,
    logging: true,
    entities: [join(__dirname, '../domains/**/models/*.ts')],
  },
  prod: {
    type: 'mysql',
    host: config.database.host,
    port: 3306,
    database: config.database.dbname,
    username: config.database.username,
    password: config.database.password,
    entities: [join(__dirname, '../domains/**/models/*.ts')],
    logging: false,
  },
  test: {
    type: 'sqlite',
    database: ':memory:',
    entities: [join(__dirname, '../domains/**/models/*.ts')],
    logging: false,
    dropSchema: true,
    synchronize: true,
  },
};
