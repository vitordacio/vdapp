import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateEmail {
  email: string;
}

export const UpdateEmail = (data: IUpdateEmail): AxiosPromise<IUser> => {
  const user = api.put('/user/email', data);

  return user;
};
