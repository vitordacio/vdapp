import { IAddress } from './address';
import { IParticipation } from './participation';
import { IEventType } from './types';
import { IUser } from './user';

export interface IEvent {
  id_event: string;
  type_id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  finish_date: null;
  finish_time: string;
  cover_photo: string;
  drink_preferences: string;
  min_amount: number;
  tickets_free: number;
  ticket_value: number;
  club_name: string;
  performer: string;
  author_id: string;
  address_id: string;
  private: boolean;
  type: IEventType;
  address: IAddress;
  author: IUser;
  participations: IParticipation;
  status: 'not_started' | 'started' | 'finished' | '';
}
