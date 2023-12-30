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
  friends_count: number;
  reacts_count: number;
  social_networks: IUserSocial[];
  friendship_id: string | '';
  friendship_status: 'friends' | 'request_sent' | 'request_received' | '';
  can_see_content: boolean;
  react_id: string | '';
  blocked: boolean;

  // control: UserControl;
}

// export type UserControl = {
//   friendship_id?: string;
//   friendship_status: 'friends' | 'request_sent' | 'request_received' | '';
//   can_see_content: boolean;
// };
