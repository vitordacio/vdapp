export interface IUserSocial {
  id_social_network: string;
  username: string;
  type_id: string;
  user_id: string;
  type: IUserSocialType;
}

export interface IUserSocialType {
  id_social_network_type: string;
  name: 'instagram' | 'tiktok' | 'twitter' | 'twitch' | 'youtube';
  base_url: string;
  deep_link: string;
}
