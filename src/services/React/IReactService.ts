export interface ICreateReactUser {
  user_id: string;
  emoji_id: string;
  message?: string;
}

export interface ICreateReactEvent {
  event_id: string;
  emoji_id: string;
  message?: string;
}

export interface IFindReactsEvent {
  event_id: string;
  page?: number;
  limit?: number;
}

export interface IFindReactsUser {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface IFindReactsReceivedUser {
  user_id: string;
  name?: string;
  page?: number;
  limit?: number;
}
