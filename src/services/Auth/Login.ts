import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface ILogin {
  email: string;
  password: string;
}

interface IResponse {
  accessToken: string;
  user: IUser;
}

export const Login = (data: ILogin): AxiosPromise<IResponse> => {
  const user = api.post('/auth/user', {
    login: data.email,
    password: data.password,
  });

  return user;
};
