import api from '@config/api';
import { AxiosResponse } from 'axios';
import { ISuggestion } from '@interfaces/suggestion';
import { ICreateSuggestion } from './ISuggestionService';

interface ISuggestionService {
  createSuggestion: (data: ICreateSuggestion) => Promise<ISuggestion>;
}

const service: ISuggestionService = {
  createSuggestion: async (data: ICreateSuggestion): Promise<ISuggestion> => {
    const response: AxiosResponse<ISuggestion> = await api.post(
      '/suggestion',
      data,
    );
    return response.data;
  },
};

export const suggestionService: ISuggestionService = service;
