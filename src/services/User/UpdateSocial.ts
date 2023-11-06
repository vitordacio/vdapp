import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateSocial {
  social: string;
  username: string;
}

export const UpdateSocial = (data: IUpdateSocial): AxiosPromise<IUser> => {
  const user = api.put('/user/social', data);

  return user;
};
