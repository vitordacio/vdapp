import api from '@config/api';
import { AxiosResponse } from 'axios';
import { INotification } from '@interfaces/notification';
import { IFindNotification } from './INotificationService';

interface INotificationService {
  findNotifications: (data: IFindNotification) => Promise<INotification[]>;
}

export const service: INotificationService = {
  findNotifications: async (
    _data: IFindNotification,
  ): Promise<INotification[]> => {
    const response: AxiosResponse<INotification[]> =
      await api.get(`/notification`);
    return response.data;
  },
};

export const notificationService: INotificationService = service;
