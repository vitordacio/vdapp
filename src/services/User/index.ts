import api from '@config/api';
import { IUser } from '@interfaces/user';
import { AxiosResponse } from 'axios';
import {
  ILogin,
  IAuthResponse,
  ICreateUser,
  IFindFriends,
  ISearchByName,
  IUpdateBio,
  IUpdateEmail,
  IUpdateGender,
  IUpdateLocation,
  IUpdateName,
  IUpdatePassword,
  IUpdatePrivacy,
  IUpdateSocial,
  IUpdateUsername,
} from './IUserService';

interface IUserService {
  login: (data: ILogin) => Promise<IAuthResponse>;
  createUser: (data: ICreateUser) => Promise<IUser>;
  findFriends: (data: IFindFriends) => Promise<IUser[]>;
  searchUserByName: (data: ISearchByName) => Promise<IUser[]>;
  updateBio: (data: IUpdateBio) => Promise<IUser>;
  updateEmail: (data: IUpdateEmail) => Promise<IUser>;
  updateGender: (data: IUpdateGender) => Promise<IUser>;
  updateLocation: (data: IUpdateLocation) => Promise<IUser>;
  updateName: (data: IUpdateName) => Promise<IUser>;
  updatePassword: (data: IUpdatePassword) => Promise<IUser>;
  updatePrivacy: (data: IUpdatePrivacy) => Promise<IUser>;
  updateSocial: (data: IUpdateSocial) => Promise<IUser>;
  updateUsername: (data: IUpdateUsername) => Promise<IUser>;
  verifyUsername: (data: string) => Promise<boolean>;
}

export const service: IUserService = {
  login: async (data: ILogin): Promise<IAuthResponse> => {
    const response: AxiosResponse<IAuthResponse> = await api.post(
      '/auth/user',
      data,
    );
    return response.data;
  },
  createUser: async (data: ICreateUser): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.post('/user', data);
    return response.data;
  },
  findFriends: async (data: IFindFriends): Promise<IUser[]> => {
    const response: AxiosResponse<IUser[]> = await api.get(
      `/user/friends/${data.user_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  searchUserByName: async (data: ISearchByName): Promise<IUser[]> => {
    const response: AxiosResponse<IUser[]> = await api.get(
      `/user/search?name=${data.name}&page=${data.page || 1}`,
    );
    return response.data;
  },
  updateBio: async (data: IUpdateBio): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/bio', data);
    return response.data;
  },
  updateEmail: async (data: IUpdateEmail): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/email', data);
    return response.data;
  },
  updateGender: async (data: IUpdateGender): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/gender', data);
    return response.data;
  },
  updateLocation: async (data: IUpdateLocation): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put(
      '/user/location',
      data,
    );
    return response.data;
  },
  updateName: async (data: IUpdateName): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/name', data);
    return response.data;
  },
  updatePassword: async (data: IUpdatePassword): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put(
      '/user/password',
      data,
    );
    return response.data;
  },
  updatePrivacy: async (data: IUpdatePrivacy): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/private', data);
    return response.data;
  },
  updateSocial: async (data: IUpdateSocial): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user/social', data);
    return response.data;
  },
  updateUsername: async (data: IUpdateUsername): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put(
      '/user/username',
      data,
    );
    return response.data;
  },
  verifyUsername: async (data: string): Promise<boolean> => {
    const response: AxiosResponse<boolean> = await api.get(
      `/user/check-username/${data}`,
    );
    return response.data;
  },
};

export const userService: IUserService = service;
