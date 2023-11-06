import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateUsername {
  username: string;
}

export const UpdateUsername = (data: IUpdateUsername): AxiosPromise<IUser> => {
  const user = api.put('/user/username', data);

  return user;
};
