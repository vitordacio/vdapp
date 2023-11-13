import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export const SearchUser = (name: string): AxiosPromise<IUser[]> => {
  const users = api.get(`/user/search?name=${name}`);

  return users;
};
