import { IUser } from '@interfaces/user';
import { EventControl, IEvent } from './event';
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
  control: EventControl;
}

export interface IParticipationType {
  id_participation_type: string;
  name: 'user' | 'guest' | 'mod' | 'vip';

  inviteButtonTitle?: 'Convidado' | 'Moderador' | 'VIP';
  inviteDescription?: 'convidado' | 'moderador' | 'VIP';
}
