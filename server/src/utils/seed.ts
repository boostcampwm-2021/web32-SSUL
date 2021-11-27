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
import { Post } from '@domains/post/models/Post';
import { ApplyGroup } from '@domains/group/models/ApplyGroup';

import {
  catagorySeedData,
  groupSeedData,
  techStackSeedData,
  userSeedData,
  groupTechStackSeedData,
  groupEnrollmentSeedData,
  mentorSeedData,
  postSeedData,
  applyGroupSeedData,
  mentorTechStackSeedData,
  mentoringRequestSeedData,
} from '@root/db_seed';
import { MentorTechStack } from '@domains/techstack/models/MentorTechStack';
import { MentoringRequest } from '@domains/mentoring/models/MentoringRequest';

export async function seed() {
  const seedConfig = { ...ormConfig[config.mode], dropSchema: true };
  const connection = await createConnection(seedConfig);
  await seedDatabase(connection);

  console.log('seeding done.');
}

export async function seedWithConnection(connection: Connection) {
  await seedDatabase(connection);
  console.log('seeding done.');
}

async function seedDatabase(connection: Connection) {
  await connection.createQueryBuilder().insert().into(User).values(userSeedData).execute();
  await connection.createQueryBuilder().insert().into(Category).values(catagorySeedData).execute();
  await connection.createQueryBuilder().insert().into(Group).values(groupSeedData).execute();
  await connection.createQueryBuilder().insert().into(Post).values(postSeedData).execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(TechStack)
    .values(techStackSeedData)
    .execute();
  await connection.createQueryBuilder().insert().into(Mentor).values(mentorSeedData).execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(GroupTechStack)
    .values(groupTechStackSeedData)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(GroupEnrollment)
    .values(groupEnrollmentSeedData)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(ApplyGroup)
    .values(applyGroupSeedData)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(MentorTechStack)
    .values(mentorTechStackSeedData)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(MentoringRequest)
    .values(mentoringRequestSeedData)
    .execute();
}
