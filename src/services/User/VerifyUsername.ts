import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export const VerifyUsername = (username: string): AxiosPromise<IUser> => {
  const user = api.get(`/user/check-username/${username}`);

  return user;
};
