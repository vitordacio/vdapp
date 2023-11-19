import { IUser } from '@interfaces/user';

export interface ILogin {
  login: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface ICreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IFindFriends {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface ISearchByName {
  name: string;
  page?: number;
  limit?: number;
}

export interface IUpdateBio {
  bio: string;
}

export interface IUpdateEmail {
  email: string;
}

export interface IUpdateGender {
  gender: string;
}

export interface IUpdateLocation {
  location: string;
}

export interface IUpdateName {
  name: string;
}

export interface IUpdatePassword {
  password: string;
  new_password: string;
}

export interface IUpdatePrivacy {
  private: boolean;
}

export interface IUpdateUsername {
  username: string;
}

export interface ICreateSocial {
  username: 'instagram' | 'tiktok' | 'twitter' | 'twitch' | 'youtube';
  type: string;
}
