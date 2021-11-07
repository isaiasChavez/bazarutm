module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'root',
  database: 'corvofarma',
  entities: ['./dist/src/database/Entities/*.entity.js'],
  migrationTableName: 'migrations',
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  //ssl: true,
  extra: {
    max: 25,
    min: 1,
    //ssl: true,
    //ssl: {
    //  rejectUnauthorized: false,
    //},
  },
  cli: {
    migrationsDir: './src/database/migrations',
  },
  synchronize: true,
};
