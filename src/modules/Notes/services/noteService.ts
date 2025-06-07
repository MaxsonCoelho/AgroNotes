import { api } from '@/services/api';

export interface SyncPayload {
  latitude: number;
  longitude: number;
  annotation: string;
  datetime: string;
  email: string;
}

export const syncAnnotation = async ({
  email,
  ...rest
}: SyncPayload): Promise<void> => {
  await api.post(`/?email_key=${email}`, rest);
};