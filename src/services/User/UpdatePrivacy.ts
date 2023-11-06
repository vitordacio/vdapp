import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdatePrivacy {
  private: boolean;
}

export const UpdatePrivacy = (data: IUpdatePrivacy): AxiosPromise<IUser> => {
  const user = api.put('/user/private', data);

  return user;
};
