import api from '@config/api';
import { AxiosResponse } from 'axios';
import { IReport } from '@interfaces/report';
import { ICreateReportEvent, ICreateReportUser } from './IReportService';

interface IReportService {
  createReportUser: (data: ICreateReportUser) => Promise<IReport>;
  createReportEvent: (data: ICreateReportEvent) => Promise<IReport>;
}

const service: IReportService = {
  createReportUser: async (data: ICreateReportUser): Promise<IReport> => {
    const response: AxiosResponse<IReport> = await api.post(
      `/report/user`,
      data,
    );
    return response.data;
  },
  createReportEvent: async (data: ICreateReportEvent): Promise<IReport> => {
    const response: AxiosResponse<IReport> = await api.post(
      `/report/event`,
      data,
    );
    return response.data;
  },
};

export const reportService: IReportService = service;
