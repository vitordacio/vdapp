import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosPromise } from 'axios';

export interface ICreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const CreateUser = (data: ICreateUser): AxiosPromise<IUser> => {
  const user = api.post('/user', data);

  return user;
};

// export { CreateUser };
