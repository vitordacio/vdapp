import { IEvent } from '@interfaces/event';

export type ParticipationStatus = {
  participation_id: IEvent['participation_id'];
  participation_status: IEvent['participation_status'];
  type: 'blue' | 'red' | 'green' | 'gray' | 'dark_gold' | '';
  icon: 'plus' | 'check' | 'x' | 'minus' | 'chevron' | '';
  title: string;
  buttonTitle: string;
};

// event.event_status = eventControl.event_status;
// event.participation_id = eventControl.participation_id;
// event.participation_status = eventControl.participation_status;
// event.participating = eventControl.participating;
// event.can_see_content = eventControl.can_see_content;

type ParticipationHandlerProps = {
  participation_id?: IEvent['participation_id'];
  participation_status: IEvent['participation_status'];
};

export const eventParticipationHandler = ({
  participation_id,
  participation_status,
}: ParticipationHandlerProps): ParticipationStatus => {
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
  }

  return {
    participation_id,
    participation_status,
    type,
    icon,
    title,
    buttonTitle,
  };
};
