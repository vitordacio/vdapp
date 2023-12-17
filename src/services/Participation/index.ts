import api from '@config/api';
import { IParticipation, IParticipationType } from '@interfaces/participation';
import { AxiosResponse } from 'axios';
import {
  IEventResponse,
  IFindByEventAndUser,
  IFindRequests,
  IInviteRequest,
} from './IParticipationService';

interface IParticipationService {
  requestByUser: (event_id: string) => Promise<IParticipation>;
  responseByEvent: (data: IEventResponse) => Promise<IParticipation>;
  inviteRequest: (data: IInviteRequest) => Promise<IParticipation>;
  inviteResponse: (event_id: string) => Promise<IParticipation>;
  findParticipationTypes: () => Promise<IParticipationType[]>;
  findByEventAndUser: (
    data: IFindByEventAndUser,
  ) => Promise<IParticipation | undefined>;
  findRequestsPending: (data: IFindRequests) => Promise<IParticipation[]>;
  findRequestsReviwed: (data: IFindRequests) => Promise<IParticipation[]>;
  findById: (participation_id: string) => Promise<IParticipation>;
  findByUser: () => Promise<IParticipation[]>;
  deleteParticipation: (participation_id: string) => Promise<void>;
}

const service: IParticipationService = {
  requestByUser: async (event_id: string): Promise<IParticipation> => {
    const response: AxiosResponse<IParticipation> = await api.post(
      `/participation/user/${event_id}`,
    );
    return response.data;
  },
  responseByEvent: async (data: IEventResponse): Promise<IParticipation> => {
    const response: AxiosResponse<IParticipation> = await api.post(
      `/participation/event`,
      data,
    );
    return response.data;
  },
  inviteRequest: async (data: IInviteRequest): Promise<IParticipation> => {
    const response: AxiosResponse<IParticipation> = await api.post(
      '/participation/invite/request',
      data,
    );
    return response.data;
  },
  inviteResponse: async (event_id: string): Promise<IParticipation> => {
    const response: AxiosResponse<IParticipation> = await api.post(
      `/participation/invite/response/${event_id}`,
    );
    return response.data;
  },
  findParticipationTypes: async (): Promise<IParticipationType[]> => {
    const response: AxiosResponse<IParticipationType[]> = await api.get(
      '/type/participation',
    );
    return response.data;
  },
  findByEventAndUser: async (
    data: IFindByEventAndUser,
  ): Promise<IParticipation | undefined> => {
    const response: AxiosResponse<IParticipation | undefined> = await api.get(
      `/participation/check/${data.event_id}/${data.user_id}`,
    );
    return response.data;
  },
  findRequestsPending: async (
    data: IFindRequests,
  ): Promise<IParticipation[]> => {
    const response: AxiosResponse<IParticipation[]> = await api.get(
      `/participation/requests/pending/${data.event_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  findRequestsReviwed: async (
    data: IFindRequests,
  ): Promise<IParticipation[]> => {
    const response: AxiosResponse<IParticipation[]> = await api.get(
      `/participation/requests/reviwed/${data.event_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  findById: async (participation_id: string): Promise<IParticipation> => {
    const response: AxiosResponse<IParticipation> = await api.get(
      `/participation/${participation_id}`,
    );
    return response.data;
  },
  findByUser: async (): Promise<IParticipation[]> => {
    const response: AxiosResponse<IParticipation[]> =
      await api.get('/participation');
    return response.data;
  },
  deleteParticipation: async (participation_id: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(
      `/participation/${participation_id}`,
    );
    return response.data;
  },
};

export const participationService: IParticipationService = service;
