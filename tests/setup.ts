process.env.NODE_ENV = 'test';

import { runMigrations } from '../src/config/migrate';

runMigrations();
