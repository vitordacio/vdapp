import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IMoment } from '@interfaces/moment';
import {
  ICreateMoment,
  IUpdateMoment,
  IFindMomentsByEventId,
} from './IMomentService';

interface IMomentService {
  createMoment: (data: ICreateMoment) => Promise<IMoment>;
  updateMoment: (data: IUpdateMoment) => Promise<IMoment>;
  findByEventId: (data: IFindMomentsByEventId) => Promise<IMoment[]>;
  deleteMoment: (moment_id: string) => Promise<void>;
}

const service: IMomentService = {
  createMoment: async (data: ICreateMoment): Promise<IMoment> => {
    const response: AxiosResponse<IMoment> = await api.post(`/moment`, data);
    return response.data;
  },
  updateMoment: async (data: IUpdateMoment): Promise<IMoment> => {
    const response: AxiosResponse<IMoment> = await api.put(`/moment`, data);
    return response.data;
  },
  findByEventId: async (data: IFindMomentsByEventId): Promise<IMoment[]> => {
    const response: AxiosResponse<IMoment[]> = await api.get(
      `/moment/${data.event_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  deleteMoment: async (moment_id: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(
      `/moment/${moment_id}`,
    );
    return response.data;
  },
};

export const momentService: IMomentService = service;
