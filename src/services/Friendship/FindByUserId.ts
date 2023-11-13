import api from '@config/api';
import { IFriendship } from '@interfaces/friendship';
import { AxiosPromise } from 'axios';

export const FindByUserId = (user_id: string): AxiosPromise<IFriendship[]> => {
  const user = api.get(`/friendship/user/${user_id}`);

  return user;
};
