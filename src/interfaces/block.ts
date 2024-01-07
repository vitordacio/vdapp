import { IUser } from '@interfaces/user';

export interface IBlock {
  id_block: string;
  message: string;
  author_id: string;
  author: IUser;
  receiver_id: string;
  receiver: IUser;
}
