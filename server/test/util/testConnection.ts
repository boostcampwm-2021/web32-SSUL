import { getConnection, getConnectionManager } from 'typeorm';
import createConnection from '@root/src/loader/typeorm';

export const testConnection = {
  async create() {
    if (!getConnectionManager().has('default')) {
      await createConnection();
    }
  },
  async close() {
    if (getConnectionManager().has('default')) {
      await getConnection().close();
    }
  },
};
