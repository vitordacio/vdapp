import { IEvent } from './event';
import { IAchievementType } from './types';
import { IUser } from './user';

export interface IAchievement {
  id_achievement: string;
  type_id: string;
  type: IAchievementType;
  user_id?: string;
  user?: IUser;
  event_id?: string;
  event?: IEvent;
  created_at: Date;
}
