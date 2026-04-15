import Database from 'better-sqlite3';

const dbFile = process.env.DB_FILE || 'database.sqlite';

const db = new Database(dbFile);

export default db;
