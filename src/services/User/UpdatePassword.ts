import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdatePassword {
  password: string;
  new_password: string;
}

export const UpdatePassword = (data: IUpdatePassword): AxiosPromise<IUser> => {
  const user = api.put('/user/password', data);

  return user;
};
