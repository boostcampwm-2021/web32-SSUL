import { createConnection, Connection } from 'typeorm';
import config from '@config/index';
import { ormConfig } from '@config/ormconfig';

import { Category } from '@domains/category/models/Category';
import { Group } from '@domains/group/models/Group';

import { catagorySeedData, groupSeedData } from '@root/db_seed';

export async function seed() {
  const connection = await createConnection(ormConfig[config.mode]);
  await seedDatabase(connection);

  console.log('seeding done.');
}

async function seedDatabase(connection: Connection) {
  await connection.createQueryBuilder().insert().into(Category).values(catagorySeedData).execute();
  await connection.createQueryBuilder().insert().into(Group).values(groupSeedData).execute();
}
