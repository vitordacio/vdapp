import { IEvent } from './event';
import { IUser } from './user';

export interface IMoment {
  id_moment: string;
  thumb_url: string;
  img_url: string;
  title: string;
  description: string;
  event_id: string;
  author_id: string;
  author: IUser;
  event: IEvent;
}
