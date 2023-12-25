import { EventControl, IEvent } from '@interfaces/event';

export type ParticipationStatus = {
  participation_id: IEvent['control']['participation_id'];
  status: IEvent['control']['status'];
  participation_status: IEvent['control']['participation_status'];
  can_see_content: IEvent['control']['can_see_content'];
  userIn: boolean;
  type: 'blue' | 'red' | 'green' | 'gray' | 'dark_gold' | '';
  icon: 'plus' | 'check' | 'x' | 'minus' | 'chevron' | '';
  title: string;
  buttonTitle: string;
};

export const eventParticipationHandler = (
  data: EventControl,
): ParticipationStatus => {
  const { participation_id, status, participation_status, can_see_content } =
    data;

  let userIn: boolean = false;
  let type: ParticipationStatus['type'];
  let icon: ParticipationStatus['icon'];
  let title: string = '';
  let buttonTitle: string = '';

  if (participation_status) {
    if (participation_status === 'author') title = 'Você é o dono!';
    if (participation_status.startsWith('guest'))
      title = 'Você é um convidado!';
    if (participation_status.startsWith('vip'))
      title = 'Você é um convidado VIP!';
    if (participation_status.startsWith('mod')) title = 'Você é um moderador!';
  }

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
    status,
    participation_status,
    can_see_content,
    userIn,
    type,
    icon,
    title,
    buttonTitle,
  };
};
