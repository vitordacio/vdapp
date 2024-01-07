import { IUser } from '@interfaces/user';

export interface ISuggestion {
  id_suggestion: string;
  message: string;
  user_id: string;
  user: IUser;
}
