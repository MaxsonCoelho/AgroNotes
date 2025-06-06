import { insertNote, getAllNotes, getUnsyncedNotes, markNoteAsSynced } from '../tables/notesTable';
import { Note } from '@/modules/Notes/types/noteTypes';
import { getDBConnection } from '../database';

jest.mock('../database');

const mockExecuteSql = jest.fn();
(getDBConnection as jest.Mock).mockResolvedValue({
  executeSql: mockExecuteSql,
});

describe('noteRepository', () => {
  const sampleNote: Note = {
    id: 1,
    annotation: 'Teste',
    datetime: '2025-06-06T10:00:00Z',
    location: { latitude: -3.1, longitude: -60.0 },
    synced: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should insert a note into the database', async () => {
    await insertNote(sampleNote);

    expect(mockExecuteSql).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO notes'),
      [
        sampleNote.id,
        sampleNote.annotation,
        sampleNote.datetime,
        sampleNote.location.latitude,
        sampleNote.location.longitude,
        0,
      ]
    );
  });

  it('should return all notes from the database', async () => {
    const mockRows = {
      length: 1,
      item: (i: number) => ({
        id: 1,
        annotation: 'Teste',
        datetime: '2025-06-06T10:00:00Z',
        latitude: -3.1,
        longitude: -60.0,
        synced: 1,
      }),
    };

    mockExecuteSql.mockResolvedValueOnce([{ rows: mockRows }]);

    const result = await getAllNotes();

    expect(result).toEqual([
      {
        id: 1,
        annotation: 'Teste',
        datetime: '2025-06-06T10:00:00Z',
        location: {
          latitude: -3.1,
          longitude: -60.0,
        },
        synced: true,
      },
    ]);
  });

  it('should return unsynced notes from the database', async () => {
    const mockRows = {
      length: 1,
      item: (i: number) => ({
        id: 2,
        annotation: 'Offline note',
        datetime: '2025-06-05T09:00:00Z',
        latitude: -2.9,
        longitude: -59.9,
        synced: 0,
      }),
    };

    mockExecuteSql.mockResolvedValueOnce([{ rows: mockRows }]);

    const result = await getUnsyncedNotes();

    expect(result).toEqual([
      {
        id: 2,
        annotation: 'Offline note',
        datetime: '2025-06-05T09:00:00Z',
        location: {
          latitude: -2.9,
          longitude: -59.9,
        },
        synced: false,
      },
    ]);
  });

  it('should mark a note as synced', async () => {
    await markNoteAsSynced(1);
    expect(mockExecuteSql).toHaveBeenCalledWith(
      'UPDATE notes SET synced = 1 WHERE id = ?',
      [1]
    );
  });
});
