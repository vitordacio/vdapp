import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IFriendship } from '@interfaces/friendship';

interface IFriendshipService {
  createRequest: (user_id: string) => Promise<IFriendship>;
  createResponse: (user_id: string) => Promise<IFriendship>;
  deleteFriendship: (friendship_id: string) => Promise<void>;
}

const service: IFriendshipService = {
  createRequest: async (user_id: string): Promise<IFriendship> => {
    const response: AxiosResponse<IFriendship> = await api.post(
      `/friendship/request/${user_id}`,
    );
    return response.data;
  },
  createResponse: async (user_id: string): Promise<IFriendship> => {
    const response: AxiosResponse<IFriendship> = await api.post(
      `/friendship/response/${user_id}`,
    );
    return response.data;
  },
  deleteFriendship: async (friendship_id: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(
      `/friendship/${friendship_id}`,
    );
    return response.data;
  },
};

export const friendshipService: IFriendshipService = service;
