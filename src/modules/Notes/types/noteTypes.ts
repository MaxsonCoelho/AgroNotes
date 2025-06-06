export interface Note {
  id: number; 
  annotation: string;
  datetime: string; 
  location: {
    latitude: number;
    longitude: number;
  };
  synced: boolean;
}
