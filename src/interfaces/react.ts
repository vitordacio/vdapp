import { IEmoji } from './emoji';
import { IEvent } from './event';
import { IUser } from './user';

export interface IReact {
  id_react: string;
  type: 'user' | 'event';
  message?: string;
  emoji_id: string;
  emoji: IEmoji;
  author_id: string;
  author: IUser;
  receiver_id?: string;
  receiver: IUser;
  event_id?: string;
  event: IEvent;
  created_at: Date;
}
