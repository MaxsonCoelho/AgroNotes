import { addToQueue, getQueue, clearQueue } from '../retryQueue';
import { Note } from '@/modules/Notes/types/noteTypes';

describe('noteSyncQueue', () => {
  const sampleNote: Note = {
    id: 1,
    annotation: 'Fila de teste',
    datetime: '2025-06-06T10:00:00Z',
    location: {
      latitude: -3.1,
      longitude: -60.0,
    },
    synced: false,
  };

  beforeEach(() => {
    clearQueue();
  });

  it('should add a note to the queue', () => {
    addToQueue(sampleNote);
    const queue = getQueue();
    expect(queue).toHaveLength(1);
    expect(queue[0]).toEqual(sampleNote);
  });

  it('should return all notes in the queue', () => {
    addToQueue(sampleNote);
    const queue = getQueue();
    expect(queue).toEqual([sampleNote]);
  });

  it('should clear the queue', () => {
    addToQueue(sampleNote);
    clearQueue();
    expect(getQueue()).toEqual([]);
  });
});
