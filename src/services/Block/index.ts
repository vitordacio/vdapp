import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IBlock } from '@interfaces/block';

interface IBlockService {
  findBlock: (user_id: string) => Promise<boolean>;
  createBlock: (user_id: string) => Promise<IBlock>;
  deleteBlock: (user_id: string) => Promise<void>;
}

const service: IBlockService = {
  findBlock: async (user_id: string): Promise<boolean> => {
    const response: AxiosResponse<boolean> = await api.get(`/block/${user_id}`);
    return response.data;
  },
  createBlock: async (user_id: string): Promise<IBlock> => {
    const response: AxiosResponse<IBlock> = await api.post(`/block/${user_id}`);
    return response.data;
  },
  deleteBlock: async (user_id: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/block/${user_id}`);
    return response.data;
  },
};

export const blockService: IBlockService = service;
