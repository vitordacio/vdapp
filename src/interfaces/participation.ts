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
  type: IParticipationType;
  participation_status: IParticipationStatus;
  participation_name: IParticipationStatus;
}

export interface IParticipationType {
  id_participation_type: string;
  name: 'user' | 'guest' | 'mod' | 'vip';

  inviteButtonTitle?: 'Convidado' | 'Moderador' | 'VIP';
  inviteDescription?: 'convidado' | 'moderador' | 'VIP';
}

export type IParticipationStatus =
  | 'author'
  | 'user_in'
  | 'user_out'
  | 'guest_in'
  | 'guest_out'
  | 'mod_in'
  | 'mod_out'
  | 'vip_in'
  | 'vip_out'
  | '';
