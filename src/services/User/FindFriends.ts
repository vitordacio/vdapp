import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export const FindFriends = (user_id: string): AxiosPromise<IUser[]> => {
  const users = api.get(`/user/friends/${user_id}`);

  return users;
};
