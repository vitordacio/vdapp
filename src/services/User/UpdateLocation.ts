import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface IUpdateLocation {
  location: string;
}

export const UpdateLocation = (data: IUpdateLocation): AxiosPromise<IUser> => {
  const user = api.put('/user/location', data);

  return user;
};
