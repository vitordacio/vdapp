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
  event_status: IEvent['event_status'];
  participation_id?: IEvent['participation_id'];
  participation_status: IEvent['participation_status'];
  can_see_content: IEvent['can_see_content'];
  participating: IEvent['participating'];
  created_at: Date;
}

export interface IParticipationType {
  id_participation_type: string;
  name: 'user' | 'guest' | 'mod' | 'vip';

  inviteButtonTitle?: 'Convidado' | 'Moderador' | 'VIP';
  inviteDescription?: 'convidado' | 'moderador' | 'VIP';
}
