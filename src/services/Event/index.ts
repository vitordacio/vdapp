import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IEvent } from '@interfaces/event';
import { IEventType } from '@interfaces/types';
import {
  ISearchByName,
  IFindByUserId,
  ICreateEvent,
  IUpdateAdditional,
  IUpdateAddress,
  IUpdateClubName,
  IUpdateDrinkPreferences,
  IUpdateHours,
  IUpdateLocation,
  IUpdateMinAmount,
  IUpdateName,
  IUpdatePerformer,
  IUpdatePrivacy,
  IUpdateTicketsFree,
  IUpdateTicketsValue,
} from './IEventService';

interface IEventService {
  createEvent: (data: ICreateEvent) => Promise<IEvent>;
  findEventTypes: () => Promise<IEventType[]>;
  findById: (data: string) => Promise<IEvent>;
  findByUserId: (data: IFindByUserId) => Promise<IEvent[]>;
  searchEventByName: (data: ISearchByName) => Promise<IEvent[]>;
  updateName: (data: IUpdateName) => Promise<IEvent>;
  updateLocation: (data: IUpdateLocation) => Promise<IEvent>;
  updateHours: (data: IUpdateHours) => Promise<IEvent>;
  updatePrivacy: (data: IUpdatePrivacy) => Promise<IEvent>;
  updateAdditional: (data: IUpdateAdditional) => Promise<IEvent>;
  updateDrinkPreferences: (data: IUpdateDrinkPreferences) => Promise<IEvent>;
  updateMinAmount: (data: IUpdateMinAmount) => Promise<IEvent>;
  updatePerformer: (data: IUpdatePerformer) => Promise<IEvent>;
  updateClubName: (data: IUpdateClubName) => Promise<IEvent>;
  updateTicketsValue: (data: IUpdateTicketsValue) => Promise<IEvent>;
  updateTicketsFree: (data: IUpdateTicketsFree) => Promise<IEvent>;
  updateAddress: (data: IUpdateAddress) => Promise<IEvent>;
  deleteEvent: (data: string) => Promise<void>;
}

const service: IEventService = {
  createEvent: async (data: ICreateEvent): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.post('/event', data);
    return response.data;
  },
  findEventTypes: async (): Promise<IEventType[]> => {
    const response: AxiosResponse<IEventType[]> = await api.get('/type/event');
    return response.data;
  },
  findById: async (data: string): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.get(`/event/${data}`);
    return response.data;
  },
  findByUserId: async (data: IFindByUserId): Promise<IEvent[]> => {
    const response: AxiosResponse<IEvent[]> = await api.get(
      `/event/user/${data.user_id}?page=${data.page || 1}`,
    );
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
  updateName: async (data: IUpdateName): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put('/event/name', data);
    return response.data;
  },
  updateLocation: async (data: IUpdateLocation): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/location',
      data,
    );
    return response.data;
  },
  updateHours: async (data: IUpdateHours): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put('/event/hours', data);
    return response.data;
  },
  updatePrivacy: async (data: IUpdatePrivacy): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/private',
      data,
    );
    return response.data;
  },
  updateAdditional: async (data: IUpdateAdditional): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/additional',
      data,
    );
    return response.data;
  },
  updateDrinkPreferences: async (
    data: IUpdateDrinkPreferences,
  ): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/drink_preferences',
      data,
    );
    return response.data;
  },
  updateMinAmount: async (data: IUpdateMinAmount): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/min_amount',
      data,
    );
    return response.data;
  },
  updatePerformer: async (data: IUpdatePerformer): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/performer',
      data,
    );
    return response.data;
  },
  updateClubName: async (data: IUpdateClubName): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/club_name',
      data,
    );
    return response.data;
  },
  updateTicketsValue: async (data: IUpdateTicketsValue): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/tickets_value',
      data,
    );
    return response.data;
  },
  updateTicketsFree: async (data: IUpdateTicketsFree): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/tickets_free',
      data,
    );
    return response.data;
  },
  updateAddress: async (data: IUpdateAddress): Promise<IEvent> => {
    const response: AxiosResponse<IEvent> = await api.put(
      '/event/address',
      data,
    );
    return response.data;
  },
  deleteEvent: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/event/${data}`);
    return response.data;
  },
};

export const eventService: IEventService = service;
