module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'root',
  database: 'corvofarma',
  entities: ['./dist/src/modules/**/*.entity.js'],
  migrationTableName: 'migrations',
  migrations: [
      "src/migration/**/*.ts"
   ],  //ssl: true,
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
