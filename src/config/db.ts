import Database from 'better-sqlite3';

const isTest = process.env.NODE_ENV === 'test';
const dbFile = isTest ? 'test.sqlite' : (process.env.DB_FILE ?? 'database.sqlite');

const db = new Database(dbFile);

export default db;
