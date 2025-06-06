import { getDBConnection } from '../database';
import { Note } from '@/modules/Notes/types/noteTypes';

export const insertNote = async (note: Note) => {
  const db = await getDBConnection();

  await db.executeSql(
    `INSERT INTO notes (id, annotation, datetime, latitude, longitude, synced)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      note.id,
      note.annotation,
      note.datetime,
      note.location.latitude,
      note.location.longitude,
      note.synced ? 1 : 0,
    ]
  );
};

export const getAllNotes = async (): Promise<Note[]> => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM notes`);

  const notes: Note[] = [];
  for (let i = 0; i < results[0].rows.length; i++) {
    const row = results[0].rows.item(i);
    notes.push({
      id: row.id,
      annotation: row.annotation,
      datetime: row.datetime,
      location: {
        latitude: row.latitude,
        longitude: row.longitude,
      },
      synced: !!row.synced,
    });
  }

  return notes;
};

export const getUnsyncedNotes = async (): Promise<Note[]> => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM notes WHERE synced = 0`);

  const notes: Note[] = [];
  for (let i = 0; i < results[0].rows.length; i++) {
    const row = results[0].rows.item(i);
    notes.push({
      id: row.id,
      annotation: row.annotation,
      datetime: row.datetime,
      location: {
        latitude: row.latitude,
        longitude: row.longitude,
      },
      synced: !!row.synced,
    });
  }

  return notes;
};

export const markNoteAsSynced = async (id: number) => {
  const db = await getDBConnection();
  await db.executeSql(`UPDATE notes SET synced = 1 WHERE id = ?`, [id]);
};
