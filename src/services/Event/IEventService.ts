export interface ISearchByName {
  name: string;
  page?: number;
  limit?: number;
}

export interface ICreateEvent {
  type_id: string;
  name: string;
  location: string;
  start?: string;
  finish?: string;
  private: boolean;
  additional?: string;
  min_amount?: string;
  drink_preferences?: string;
  club_name?: string;
  ticket_value?: number;
  performer?: string;
}
