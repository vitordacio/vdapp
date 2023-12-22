import { UserControl } from '@interfaces/user';

export type FriendshipStatus = {
  friendship_id?: UserControl['friendship_id'];
  friendship_status: UserControl['friendship_status'];
  can_see_content: UserControl['can_see_content'];
  type: 'blue' | 'red' | 'green' | 'gray';
  icon: 'user_plus' | 'user_check' | 'user_x' | 'user_minus';
  buttonTitle: string;
};

export const userFriendshipHandler = (data: UserControl): FriendshipStatus => {
  const { friendship_id, friendship_status, can_see_content } = data;

  let type: FriendshipStatus['type'];
  let icon: FriendshipStatus['icon'];
  let buttonTitle: string = '';

  if (!friendship_status) {
    type = 'blue';
    icon = 'user_plus';
    buttonTitle = 'Adicionar amigo';
  } else if (friendship_status === 'request_received') {
    type = 'green';
    icon = 'user_check';
    buttonTitle = 'Aceitar amizade';
  } else if (friendship_status === 'request_sent') {
    type = 'gray';
    icon = 'user_x';
    buttonTitle = 'Cancelar solicitação';
  } else {
    type = 'red';
    icon = 'user_minus';
    buttonTitle = 'Desfazer amizade';
  }

  return {
    friendship_id,
    friendship_status,
    can_see_content,
    type,
    icon,
    buttonTitle,
  };
};
