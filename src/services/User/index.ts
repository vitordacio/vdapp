import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosResponse } from 'axios';
import { IUpdateName } from './IUserService';

interface IUserService {
  updateName: (data: IUpdateName) => Promise<IUser>;
}

export const service: IUserService = {
  updateName: async (data: IUpdateName): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/name', data);
    return response.data;
  },
};

export const userService: IUserService = service;
