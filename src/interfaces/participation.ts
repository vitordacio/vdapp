import { IUser } from '@interfaces/user';
import { IEvent } from './event';
import { IAddress } from './address';

export interface IParticipation {
  id_participation: string;
  type_id: string;
  in: boolean;
  confirmed_by_user: boolean;
  confirmed_by_event: boolean;
  user_id: string;
  event_id: string;
  reviwer_id: string;
  id_address: string;
  event: IEvent;
  address: IAddress;
  user: IUser;
  reviwer: IUser;
}

export interface IParticipationType {
  id_participation_type: string;
  type: 'user' | 'guest' | 'mod' | 'vip';
  name: string;
}
