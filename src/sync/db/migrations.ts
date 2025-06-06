import { getDBConnection } from './database';

export const createTables = async () => {
    const db = await getDBConnection();

    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY NOT NULL,
            annotation TEXT,
            datetime TEXT,
            latitude REAL,
            longitude REAL,
            synced INTEGER
        );
    `);
};
