import { IUser, UserControl } from '@interfaces/user';

export interface IFriendship {
  id_friendship: string;
  author_id: string;
  receiver_id: string;
  confirmed: boolean;
  author: IUser;
  receiver: IUser;
  control: UserControl;
}
