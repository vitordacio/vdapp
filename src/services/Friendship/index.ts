import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IFriendship } from '@interfaces/friendship';

interface IFriendshipService {
  createRequest: (data: string) => Promise<IFriendship>;
  createResponse: (data: string) => Promise<IFriendship>;
  deleteFriendship: (data: string) => Promise<void>;
}

const service: IFriendshipService = {
  createRequest: async (data: string): Promise<IFriendship> => {
    const response: AxiosResponse<IFriendship> = await api.post(
      `/friendship/request/${data}`,
    );
    return response.data;
  },
  createResponse: async (data: string): Promise<IFriendship> => {
    const response: AxiosResponse<IFriendship> = await api.post(
      `/friendship/response/${data}`,
    );
    return response.data;
  },
  deleteFriendship: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(
      `/friendship/${data}`,
    );
    return response.data;
  },
};

export const friendshipService: IFriendshipService = service;
