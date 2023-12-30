export interface IUserUpdate {
  id_user_update: string;
  type: 'email' | 'name' | 'username' | 'password';
  from: string;
  to: string;
  user_id: string;
  created_at: Date;
}
