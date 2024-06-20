import { User } from './user';
import { Room } from './room';

export interface Message {
  _id?: string;
  content: Content
  sender: User
  to: User
  status: string
  timeSent: Date
  room: string
  created?: Date | string;
}

interface Content {
  text: string,
  imoji: string,
  files: string[],

}
