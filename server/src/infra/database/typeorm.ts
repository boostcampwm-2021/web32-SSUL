import { createConnection } from 'typeorm';

export default async function () {
  const connection = await createConnection();
  return connection;
}
