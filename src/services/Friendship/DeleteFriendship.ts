import api from '@config/api';
import { AxiosPromise } from 'axios';

export const DeleteFriendship = (user_id: string): AxiosPromise<void> => {
  const user = api.delete(`/friendship/${user_id}`);

  return user;
};
