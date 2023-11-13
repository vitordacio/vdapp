import api from '@config/api';
import { IFriendship } from '@interfaces/friendship';
import { AxiosPromise } from 'axios';

export const CreateRequest = (user_id: string): AxiosPromise<IFriendship> => {
  const user = api.post(`/friendship/request/${user_id}`);

  return user;
};
