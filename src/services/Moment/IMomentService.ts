export interface ICreateMoment {
  event_id: string;
  title?: string;
  description?: string;
}

export interface IUpdateMoment {
  moment_id: string;
  title?: string;
  description?: string;
}

export interface IFindMomentsByEventId {
  event_id: string;
  page?: number;
  limit?: number;
}
