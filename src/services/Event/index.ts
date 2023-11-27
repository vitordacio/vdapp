import api from '@config/api';
import { IEvent } from '@interfaces/event';
import { AxiosResponse } from 'axios';
import { ISearchByName } from './IEventService';

interface IEventService {
  searchEventByName: (data: ISearchByName) => Promise<IEvent[]>;
  findById: (data: string) => Promise<IEvent>;
}

const service: IEventService = {
  searchEventByName: async (data: ISearchByName): Promise<IEvent[]> => {
    const response: AxiosResponse<IEvent[]> = await api.get(
      `/event/search?page=${data.page || 1}&name${
        data.name && `=${data.name}`
      }`,
    );
    return response.data;
  },
  findById: async (data: string): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.get(`/event/${data}`);
    return response.data;
  },
};

export const eventService: IEventService = service;
