import { IAchievement } from '@interfaces/achievement';

export const handleAchievementMessage = (data: IAchievement): string => {
  const { type, category, name, difficulty } = data.type;
  const star = '⭐';
  let message = '';
  if (type === 'user' && category === 'event' && name === 'host')
    message = 'Anfitrião';
  if (type === 'user' && category === 'participation' && name === 'user')
    message = 'Participante';
  if (type === 'user' && category === 'participation' && name === 'guest')
    message = 'Convidado';
  if (type === 'user' && category === 'participation' && name === 'vip')
    message = 'Convidado VIP';
  if (type === 'user' && category === 'participation' && name === 'mod')
    message = 'Moderador';

  if (type === 'event' && category === 'participation' && name === 'popularity')
    message = 'Popularidade';
  if (type === 'event' && category === 'participation' && name === 'event')
    message = 'Viral';
  if (type === 'event' && category === 'event' && name === 'host_first')
    message = 'Primeiro evento do anfitrião';
  if (
    type === 'event' &&
    category === 'event' &&
    name === 'participation_first'
  )
    message = 'Primeiro evento de um participante';

  if (difficulty && difficulty !== 0)
    message = `${message} ${star.repeat(difficulty)}`;

  return message;
};
