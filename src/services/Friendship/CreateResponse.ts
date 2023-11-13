import api from '@config/api';
import { IFriendship } from '@interfaces/friendship';
import { AxiosPromise } from 'axios';

export const CreateResponse = (user_id: string): AxiosPromise<IFriendship> => {
  const user = api.post(`/friendship/response/${user_id}`);

  return user;
};
