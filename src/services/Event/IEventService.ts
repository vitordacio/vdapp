export interface ISearchByName {
  name: string;
  page?: number;
  limit?: number;
}

export interface IFindByUserId {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface ICreateEvent {
  type_id: string;
  name: string;
  location: string;
  start_time?: Date;
  finish_time?: Date;
  is_private: boolean;
  additional?: string;
  min_amount?: string;
  drink_preferences?: string;
  club_name?: string;
  ticket_value?: string;
  ticket_free?: number;
  performer?: string;
  address_id?: string;
}

export interface IUpdateName {
  event_id: string;
  name: string;
}

export interface IUpdateLocation {
  event_id: string;
  location: string;
}

export interface IUpdateHours {
  event_id: string;
  start_time: Date;
  finish_time: Date;
}

export interface IUpdatePrivacy {
  event_id: string;
  is_private: boolean;
}

export interface IUpdateAdditional {
  event_id: string;
  additional: string;
}

export interface IUpdateDrinkPreferences {
  event_id: string;
  drink_preferences: string;
}

export interface IUpdateMinAmount {
  event_id: string;
  min_amount: string;
}

export interface IUpdatePerformer {
  event_id: string;
  performer: string;
}

export interface IUpdateClubName {
  event_id: string;
  club_name: string;
}

export interface IUpdateTicketsValue {
  event_id: string;
  tickets_value: string;
}

export interface IUpdateTicketsFree {
  event_id: string;
  tickets_free: string;
}

export interface IUpdateAddress {
  event_id: string;
  address_id: string;
}
