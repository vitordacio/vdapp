import { IUser } from '@interfaces/user';

export interface IFriendship {
  id_friendship: string;
  sender_id: string;
  receiver_id: string;
  confirmed: boolean;
  sender?: IUser;
  receiver?: IUser;
}
