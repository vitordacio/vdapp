import { IFriendship } from './friendship';
import { IUser } from './user';

export interface INotification {
  id_notification: string;
  message: string;
  read: boolean;
  type: string;
  user_id: string;
  author_id: string;
  author: IUser;
  emoji_id: string;
  participation_id: string;
  friendship_id: string;
  friendship?: IFriendship;
}
