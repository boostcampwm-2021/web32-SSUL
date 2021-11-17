import { createConnection, Connection } from 'typeorm';
import config from '@config/index';
import { ormConfig } from '@config/ormconfig';

import { Category } from '@domains/category/models/Category';
import { Group } from '@domains/group/models/Group';
import { TechStack } from '@domains/techstack/models/TechStack';

import {
  catagorySeedData,
  groupSeedData,
  profileData,
  techStackData,
  userData,
  usingTechStackData,
  groupEnrollmentData,
  mentorData,
} from '@root/db_seed';
import { UsingTechStack } from '@domains/techstack/models/UsingTechStack';
import { User } from '@domains/user/models/User';
import { Profile } from '@domains/user/models/Profile';
import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';
import { Mentor } from '@domains/mentoring/models/Mentor';

export async function seed() {
  const connection = await createConnection(ormConfig[config.mode]);
  await seedDatabase(connection);

  console.log('seeding done.');
}

async function seedDatabase(connection: Connection) {
  await connection.createQueryBuilder().insert().into(Category).values(catagorySeedData).execute();
  await connection.createQueryBuilder().insert().into(Group).values(groupSeedData).execute();
  await connection.createQueryBuilder().insert().into(TechStack).values(techStackData).execute();
  await connection.createQueryBuilder().insert().into(User).values(userData).execute();
  await connection.createQueryBuilder().insert().into(Profile).values(profileData).execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(GroupEnrollment)
    .values(groupEnrollmentData)
    .execute();
  await connection.createQueryBuilder().insert().into(Mentor).values(mentorData).execute();

  await connection
    .createQueryBuilder()
    .insert()
    .into(UsingTechStack)
    .values(usingTechStackData)
    .execute();
}
