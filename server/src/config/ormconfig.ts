import config from './index';
import { join } from 'path';

interface OrmConfig {
  [key: string]: any;
}

export const ormConfig: OrmConfig = {
  dev: {
    type: 'mysql',
    host: 'localhost',
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
    host: '101.101.217.227',
    port: 3306,
    database: 'ssul',
    username: config.database.username,
    password: config.database.password,
    entities: [join(__dirname, '../domains/**/models/*.ts')],
  },
};
