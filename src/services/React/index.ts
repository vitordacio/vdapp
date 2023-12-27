import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IReact } from '@interfaces/react';
import { ICreateReactUser, ICreateReactEvent } from './IReactService';

interface IReactService {
  createReactUser: (data: ICreateReactUser) => Promise<IReact>;
  createReactEvent: (data: ICreateReactEvent) => Promise<IReact>;
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
  deleteReact: async (react_id: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(
      `/react/${react_id}`,
    );
    return response.data;
  },
};

export const reactService: IReactService = service;
