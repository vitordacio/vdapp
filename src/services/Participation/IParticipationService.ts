export interface IInviteRequest {
  event_id: string;
  user_id: string;
  type_id: string;
}

export interface IFindByEventAndUser {
  event_id: string;
  user_id: string;
}
