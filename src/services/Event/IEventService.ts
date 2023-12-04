export interface ISearchByName {
  name: string;
  page?: number;
  limit?: number;
}

export interface ICreateEvent {
  type_id: string;
  name: string;
  location: string;
  private?: boolean;
}
