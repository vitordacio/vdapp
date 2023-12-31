import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IReact } from '@interfaces/react';
import {
  ICreateReactUser,
  ICreateReactEvent,
  IFindReactsEvent,
  IFindReactsUser,
  IFindReactsReceivedUser,
} from './IReactService';

interface IReactService {
  createReactUser: (data: ICreateReactUser) => Promise<IReact>;
  createReactEvent: (data: ICreateReactEvent) => Promise<IReact>;
  findReactsEvent: (data: IFindReactsEvent) => Promise<IReact[]>;
  findReactsUser: (data: IFindReactsUser) => Promise<IReact[]>;
  findReactsReceivedUser: (data: IFindReactsReceivedUser) => Promise<IReact[]>;
  deleteReact: (react_id: string) => Promise<void>;
}

const service: IReactService = {
  createReactUser: async (data: ICreateReactUser): Promise<IReact> => {
    const response: AxiosResponse<IReact> = await api.post('/react/user', data);
    return response.data;
  },
  createReactEvent: async (data: ICreateReactEvent): Promise<IReact> => {
    const response: AxiosResponse<IReact> = await api.post(
      '/react/event',
      data,
    );
    return response.data;
  },
  findReactsEvent: async (data: IFindReactsEvent): Promise<IReact[]> => {
    const response: AxiosResponse<IReact[]> = await api.get(
      `/react/event/${data.event_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  findReactsUser: async (data: IFindReactsUser): Promise<IReact[]> => {
    const response: AxiosResponse<IReact[]> = await api.get(
      `/react/user/${data.user_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  findReactsReceivedUser: async (
    data: IFindReactsReceivedUser,
  ): Promise<IReact[]> => {
    const response: AxiosResponse<IReact[]> = await api.get(
      `/react/user/received/${data.user_id}?page=${data.page || 1}&name${
        data.name && `=${data.name}`
      }`,
    );
    return response.data;
  },
  deleteReact: async (react_id: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(
      `/react/${react_id}`,
    );
    return response.data;
  },
};

export const reactService: IReactService = service;
