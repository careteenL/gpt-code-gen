import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import { History } from './entities/history.entity';

config({
  path: 'src/.migration.env',
});

export default new DataSource({
  type: 'mysql',
  host: process.env.db_host,
  port: +process.env.db_port,
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  synchronize: false,
  logging: true,
  entities: [History],
  poolSize: 10,
  migrations: ['src/migrations/**.ts'],
  connectorPackage: 'mysql2',
  extra: {
    authPlugins: 'sha156_password',
  },
});
