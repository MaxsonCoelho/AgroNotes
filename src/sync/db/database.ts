// src/sync/db/database.ts
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'agronotes.db', location: 'default' });
};
