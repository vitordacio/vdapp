import { IUser } from '@interfaces/user';
import { IEvent } from './event';

export interface IAddress {
  id_address: string;
  lat: number;
  long: number;
  zip: string;
  street: string;
  uf: string;
  city: string;
  district: string;
  number: string;
  user_id: string;
  user?: IUser;
  receiver?: IUser;
  events: IEvent[];
}
