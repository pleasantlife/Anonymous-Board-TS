import 'dotenv/config';
import mysql from 'mysql2/promise';

export default {
  async createSchema() {
    const connection = await mysql.createConnection({
      host: process.env.HOST || 'localhost',
      user: process.env.SQL_USER || 'admin',
      password: process.env.SQL_PASSWORD || '',
      port: Number(process.env.SQL_PORT) || 3306,
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.SQL_DB_NAME} DEFAULT CHARACTER SET utf8mb4;`,
    );
    await connection.end();
  },
};
