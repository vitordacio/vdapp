import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IEvent } from '@interfaces/event';
import { IEventType } from '@interfaces/types';
import { ISearchByName, ICreateEvent } from './IEventService';

interface IEventService {
  findEventTypes: () => Promise<IEventType[]>;
  createEvent: (data: ICreateEvent) => Promise<IEvent>;
  searchEventByName: (data: ISearchByName) => Promise<IEvent[]>;
  findById: (data: string) => Promise<IEvent>;
}

const service: IEventService = {
  createEvent: async (data: ICreateEvent): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.post('/event', data);
    return response.data;
  },
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
  findEventTypes: async (): Promise<IEventType[]> => {
    const response: AxiosResponse<IEventType[]> = await api.get('/type/event');
    return response.data;
  },
};

export const eventService: IEventService = service;
