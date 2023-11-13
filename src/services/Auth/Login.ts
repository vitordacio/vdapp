import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface ILogin {
  login: string;
  password: string;
}

interface IResponse {
  accessToken: string;
  user: IUser;
}

export const Login = (data: ILogin): AxiosPromise<IResponse> => {
  const user = api.post('/auth/user', data);

  return user;
};
