import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateGender {
  gender: string;
}

export const UpdateGender = (data: IUpdateGender): AxiosPromise<IUser> => {
  const user = api.put('/user/gender', data);

  return user;
};
