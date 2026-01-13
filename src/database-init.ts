// database-init.ts
import { DataSource } from 'typeorm';

export async function createDatabaseIfNotExists() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await dataSource.initialize();

  await dataSource.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
  );

  await dataSource.destroy();
}
