import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IAchievement } from '@interfaces/achievement';
import {
  IFindAchievementUser,
  IFindAchievementEvent,
} from './IAchievementService';

interface IAchievementService {
  findByUserId: (data: IFindAchievementUser) => Promise<IAchievement[]>;
  findByEventId: (data: IFindAchievementEvent) => Promise<IAchievement[]>;
}

const service: IAchievementService = {
  findByUserId: async (data: IFindAchievementUser): Promise<IAchievement[]> => {
    const response: AxiosResponse<IAchievement[]> = await api.get(
      `/achievement/user/${data.user_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
  findByEventId: async (
    data: IFindAchievementEvent,
  ): Promise<IAchievement[]> => {
    const response: AxiosResponse<IAchievement[]> = await api.get(
      `/achievement/event/${data.event_id}?page=${data.page || 1}`,
    );
    return response.data;
  },
};

export const achievementService: IAchievementService = service;
