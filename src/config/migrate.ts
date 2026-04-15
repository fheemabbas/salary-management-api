import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import db from './db';

dotenv.config({ quiet: true });

const migrationsDirectory = path.join(__dirname, '../../migrations');
db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )
`);

const selectMigrationStatement = db.prepare(`
    SELECT name
    FROM migrations
    WHERE name = ?
`);

const insertMigrationStatement = db.prepare(`
    INSERT INTO migrations (name)
    VALUES (?)
`);

export const runMigrations = (): void => {
    if (!fs.existsSync(migrationsDirectory)) {
        return;
    }

    const migrationFiles = fs
        .readdirSync(migrationsDirectory)
        .filter((fileName) => fileName.endsWith('.sql'))
        .sort();

    for (const migrationFile of migrationFiles) {
        const existingMigration = selectMigrationStatement.get(
            migrationFile
        ) as { name: string } | undefined;

        if (existingMigration) {
            continue;
        }

        const migrationPath = path.join(migrationsDirectory, migrationFile);
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');

        db.exec(migrationSql);
        insertMigrationStatement.run(migrationFile);
    }
};

if (require.main === module) {
    runMigrations();
}
