import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosResponse } from 'axios';
import { ICreateUser, IUpdateName } from './IUserService';

interface IUserService {
  createUser: (data: ICreateUser) => Promise<IUser>;
  updateName: (data: IUpdateName) => Promise<IUser>;
}

export const service: IUserService = {
  createUser: async (data: ICreateUser): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.post('/user', data);
    return response.data;
  },
  updateName: async (data: IUpdateName): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/name', data);
    return response.data;
  },
};

export const userService: IUserService = service;
