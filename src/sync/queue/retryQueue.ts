import { Note } from '@/modules/Notes/types/noteTypes';

let retryQueue: Note[] = [];

export const addToQueue = (note: Note) => {
  retryQueue.push(note);
};

export const getQueue = () => retryQueue;

export const clearQueue = () => {
  retryQueue = [];
};
