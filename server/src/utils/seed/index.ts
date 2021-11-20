import { createConnection, Connection } from 'typeorm';
import config from '@config/index';
import { ormConfig } from '@config/ormconfig';
import { Category } from '@domains/category/models/Category';
import { Group } from '@domains/group/models/Group';
import { TechStack } from '@domains/techstack/models/TechStack';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { User } from '@domains/user/models/User';
import { Mentor } from '@domains/mentoring/models/Mentor';
import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';

import {
  catagorySeedData,
  groupSeedData,
  profileData,
  techStackData,
  userData,
  groupTechStackData,
  // groupEnrollmentData,
  mentorData,
} from '@root/db_seed';

export async function seed() {
  const seedConfig = { ...ormConfig[config.mode], dropSchema: true };
  const connection = await createConnection(seedConfig);
  await seedDatabase(connection);

  console.log('seeding done.');
}

async function seedDatabase(connection: Connection) {
  await connection.createQueryBuilder().insert().into(User).values(userData).execute();
  await connection.createQueryBuilder().insert().into(Category).values(catagorySeedData).execute();
  await connection.createQueryBuilder().insert().into(Group).values(groupSeedData).execute();
  await connection.createQueryBuilder().insert().into(TechStack).values(techStackData).execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(GroupTechStack)
    .values(groupTechStackData)
    .execute();

  // await connection
  //   .createQueryBuilder()
  //   .insert()
  //   .into(GroupEnrollment)
  //   .values(groupEnrollmentData)
  //   .execute();
  // await connection.createQueryBuilder().insert().into(Mentor).values(mentorData).execute();
}
