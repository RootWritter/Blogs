import { DataSource, DataSourceOptions, getMetadataArgsStorage } from 'typeorm';

require('dotenv').config({ path: '.env' });

const getConfig = () => {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    // migrationsTransactionMode: 'each',
    migrations: [__dirname + '/../../dist/migrations/*{.ts,.js}'],
    entities: [__dirname + '/../../dist/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations_typeorm',
    cli: {
      migrationsDir: __dirname + '/../../dist/migrations/*{.ts,.js}',
    },
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  } as DataSourceOptions;
};

const datasource = new DataSource(getConfig()); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
