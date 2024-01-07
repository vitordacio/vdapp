import { IEvent } from './event';
import { IUser } from './user';

export interface IReport {
  id_report: string;
  type: 'user' | 'event';
  message: string;
  author_id: string;
  author: IUser;
  receiver_id?: string;
  receiver: IUser;
  event_id?: string;
  event: IEvent;
}
