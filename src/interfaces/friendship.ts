import { IUser } from '@interfaces/user';

export interface IFriendship {
  id_friendship: string;
  author_id: string;
  receiver_id: string;
  confirmed: boolean;
  author: IUser;
  receiver: IUser;
  friendship_id: string | '';
  friendship_status: 'friends' | 'request_sent' | 'request_received' | '';
  can_see_content: boolean;
}
