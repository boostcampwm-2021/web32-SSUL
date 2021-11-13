import { createConnection, Connection } from 'typeorm';
import config from '@config/index';
import { ormConfig } from '@config/ormconfig';

import { Category } from '@domains/category/models/Category';

import { catagorySeedData } from '@root/db_seed';

export async function seed() {
  const connection = await createConnection(ormConfig[config.mode]);
  await seedCategory(connection);

  console.log('seeding done.');
}

async function seedCategory(connection: Connection) {
  await connection.createQueryBuilder().insert().into(Category).values(catagorySeedData).execute();
}
