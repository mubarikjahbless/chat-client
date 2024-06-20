import { Message } from './message';
import { Room } from './room';

export interface User {
  id?: string;
  name?: string;
  clientId?: string;
  messages?: Message[];
  joinedRooms?: Room[];
}
