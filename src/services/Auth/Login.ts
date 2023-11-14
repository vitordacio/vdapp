import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface ILogin {
  login: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export const Login = (data: ILogin): AxiosPromise<IAuthResponse> => {
  const user = api.post('/auth/user', data);

  return user;
};
