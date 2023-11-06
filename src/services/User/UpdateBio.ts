import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateBio {
  bio: string;
}

export const UpdateBio = (data: IUpdateBio): AxiosPromise<IUser> => {
  const user = api.put('/user/bio', data);

  return user;
};
