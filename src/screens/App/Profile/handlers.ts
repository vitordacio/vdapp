import { IUser } from '@interfaces/user';

export type FriendshipStatus = {
  friendship_id: IUser['friendship_id'];
  friendship_status: IUser['friendship_status'];
  type: 'blue' | 'red' | 'green' | 'gray';
  icon: 'user_plus' | 'user_check' | 'user_x' | 'user_minus';
  buttonTitle: string;
};

type FriendShipHandlerProps = {
  friendship_id?: IUser['friendship_id'];
  friendship_status: IUser['friendship_status'];
};

export const userFriendshipHandler = ({
  friendship_id,
  friendship_status,
}: FriendShipHandlerProps): FriendshipStatus => {
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
    type,
    icon,
    buttonTitle,
  };
};
