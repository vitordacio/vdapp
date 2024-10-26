import { IAddress } from './address';
import { IParticipation } from './participation';
import { IReact } from './react';
import { IEventType } from './types';
import { IUser } from './user';

export interface IEvent {
  id_event: string;
  type_id: string;
  name: string;
  location: string;
  start_time: Date;
  finish_time: Date;
  cover_photo: string;
  drink_preferences: string;
  additional?: string;
  min_amount: string;
  tickets_free: string;
  ticket_value: string;
  club_name: string;
  author_id: string;
  address_id: string;
  private: boolean;
  type: IEventType;
  address: IAddress;
  author: IUser;
  performers: IEventPerformer[];
  participations: IParticipation;
  participating_count: number;
  reacts_count: number;
  user_react?: IReact;
  event_status: 'awaiting' | 'ongoing' | 'finished';
  participation_id?: string;
  participation_status:
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
  can_see_content: boolean;
  participating: boolean;
}

export interface IEventPerformer {
  id_performer: string;
  name: string;
  user_id?: string;
  user?: IUser;
  event_id: string;
  event: IEvent;
  created_at: Date;
}
