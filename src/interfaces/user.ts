import { IUserSocial } from './social_network';

export interface IUser {
  id_user: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  location: string;
  gender: null;
  picture: string;
  cover_photo: string;
  actived: boolean;
  private: boolean;
  locale: string;
  CNPJ: string;
  role_name: string;
  google_id: string;
  friendship_status: 'friends' | 'request_sent' | 'request_received' | '';
  can_see_content: boolean;
  friends_count: number;
  emojis_count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  social_networks: IUserSocial[];
}
