import { IFriendship } from './friendship';
import { IUser } from './user';

export interface INotification {
  id_notification: string;
  message: string;
  read: boolean;
  type: string;
  user_id: string;
  sent_by: string;
  friendship_id: string;
  emoji_id: string;
  participation_id: string;
  friendship?: IFriendship;
  author: IUser;
}
