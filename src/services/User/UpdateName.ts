import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateName {
  name: string;
}

export const UpdateName = (data: IUpdateName): AxiosPromise<IUser> => {
  const user = api.put('/user/name', data);

  return user;
};
