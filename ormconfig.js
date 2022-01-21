module.exports = {
  type: 'postgres',
  host: 'bazarutm-do-user-10684883-0.b.db.ondigitalocean.com',
  port: '25060',
  username: 'doadmin',
  password: 'wAMVrsYA0Xlpzkum',
  
  database: 'defaultdb',
  entities: ['dist/src/modules/**/*{.entity.ts,.entity.js}'],
  migrationTableName: 'migrations',
  migrations: [
      "dist/database/migrations/*{.ts,.js}"
   ],  //
   ssl: true,
  extra: {
    max: 25,
    min: 1,
    ssl: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: './src/database/migrations',
  },
  synchronize: true,
};
