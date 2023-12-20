import { IEvent } from '@interfaces/event';

export type ParticipationStatus = {
  participation_id?: string;
  participation_status: IEvent['participation_status'];
  userIn: boolean;
  type: 'blue' | 'red' | 'green' | 'gray' | 'dark_gold';
  icon: 'plus' | 'check' | 'x' | 'minus' | 'chevron';
  title: string;
  buttonTitle: string;
};

type eventParticipationHandlerProps = {
  participation_status: IEvent['participation_status'];
  participation_id?: string;
};

export const eventParticipationHandler = ({
  participation_status,
  participation_id,
}: eventParticipationHandlerProps): ParticipationStatus => {
  let userIn: boolean = false;
  let title: string = '';
  let type: ParticipationStatus['type'];
  let icon: ParticipationStatus['icon'];
  let buttonTitle: string = '';

  if (participation_status === 'author') title = 'Você é o dono!';
  if (participation_status.startsWith('guest')) title = 'Você é um convidado!';
  if (participation_status.startsWith('vip'))
    title = 'Você é um convidado VIP!';
  if (participation_status.startsWith('mod')) title = 'Você é um moderador!';

  if (!participation_status) {
    type = 'blue';
    icon = 'plus';
    buttonTitle = 'Solicitar entrada';
  } else if (participation_status === 'user_out') {
    type = 'gray';
    icon = 'x';
    buttonTitle = 'Cancelar solicitação';
  } else if (
    ['guest_out', 'vip_out', 'mod_out'].includes(participation_status)
  ) {
    type = 'green';
    icon = 'check';
    buttonTitle = 'Entrar';
  } else {
    type = 'red';
    icon = 'minus';
    buttonTitle = 'Sair do Evento';
    userIn = true;
  }

  return {
    participation_id,
    participation_status,
    userIn,
    type,
    icon,
    buttonTitle,
    title,
  };
};
