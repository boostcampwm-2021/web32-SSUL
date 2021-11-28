import { seed } from '../src/utils/seed';

(async () => {
  await seed();
  process.exit();
})();
