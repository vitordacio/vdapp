export interface IInviteRequest {
  event_id: string;
  user_id: string;
  type_id: string;
}

export interface IEventResponse {
  participation_id: string;
  confirm: boolean;
}

export interface IFindByEventAndUser {
  event_id: string;
  user_id: string;
}

export interface IFindRequests {
  event_id: string;
  page?: number;
  limit?: number;
}

export interface IFindByUserId {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface IFindByEventId {
  event_id: string;
  page?: number;
  limit?: number;
}
