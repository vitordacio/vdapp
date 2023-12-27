import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IEmoji } from '@interfaces/emoji';
import { IEmojiType } from '@interfaces/types';
import { ISearchEmoji, IEmojiIndex } from './IEmojiService';

interface IEmojiService {
  findEmojiTypes: () => Promise<IEmojiType[]>;
  findEmoji: (data: ISearchEmoji) => Promise<IEmojiIndex>;
  findEmojiAnimal: (data: ISearchEmoji) => Promise<IEmoji[]>;
  findEmojiBody: (data: ISearchEmoji) => Promise<IEmoji[]>;
  findEmojiFace: (data: ISearchEmoji) => Promise<IEmoji[]>;
  findEmojiPeople: (data: ISearchEmoji) => Promise<IEmoji[]>;
  findEmojiSymbol: (data: ISearchEmoji) => Promise<IEmoji[]>;
}

const service: IEmojiService = {
  findEmojiTypes: async (): Promise<IEmojiType[]> => {
    const response: AxiosResponse<IEmojiType[]> = await api.get('/type/emoji');
    return response.data;
  },
  findEmoji: async (data: ISearchEmoji): Promise<IEmojiIndex> => {
    const response: AxiosResponse<IEmojiIndex> = await api.get(
      `/emoji?page=${data.page || 1}`,
    );
    return response.data;
  },
  findEmojiAnimal: async (data: ISearchEmoji): Promise<IEmoji[]> => {
    const response: AxiosResponse<IEmoji[]> = await api.get(
      `/emoji/animal?page=${data.page || 1}`,
    );
    return response.data;
  },
  findEmojiBody: async (data: ISearchEmoji): Promise<IEmoji[]> => {
    const response: AxiosResponse<IEmoji[]> = await api.get(
      `/emoji/body?page=${data.page || 1}`,
    );
    return response.data;
  },
  findEmojiFace: async (data: ISearchEmoji): Promise<IEmoji[]> => {
    const response: AxiosResponse<IEmoji[]> = await api.get(
      `/emoji/face?page=${data.page || 1}`,
    );
    return response.data;
  },
  findEmojiPeople: async (data: ISearchEmoji): Promise<IEmoji[]> => {
    const response: AxiosResponse<IEmoji[]> = await api.get(
      `/emoji/people?page=${data.page || 1}`,
    );
    return response.data;
  },
  findEmojiSymbol: async (data: ISearchEmoji): Promise<IEmoji[]> => {
    const response: AxiosResponse<IEmoji[]> = await api.get(
      `/emoji/symbol?page=${data.page || 1}`,
    );
    return response.data;
  },
};

export const emojiService: IEmojiService = service;
