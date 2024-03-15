import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

//** Generar migraciones ** : npm run migration:generate src/database/migrations/init

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: 'enock',
  password: 'enock',
  database: 'priority',
  logging: false,
  synchronize: false,
  entities: [
    'src/**/*.entity.ts',
    'src/**/**/*.entity.ts',
    'src/**/**/**/*.entity.ts',
  ],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
