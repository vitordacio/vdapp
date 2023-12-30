import { IEvent } from '@interfaces/event';

export const formatEventName = (event: IEvent): string => {
  const type = event.type.name;
  let title: string;
  if (type === 'auditorium') title = 'Apresentação';
  if (type === 'beach') title = 'Praia';
  if (type === 'birthday') title = 'Aniversário';
  if (type === 'boat') title = 'Barco';
  if (type === 'culinary') title = 'Culinária';
  if (type === 'exercise') title = 'Exercício Físico';
  if (type === 'fishing') title = 'Pesca';
  if (type === 'games') title = 'Jogos';
  if (type === 'meeting') title = 'Reunião';
  if (type === 'moon') title = 'Lual';
  if (type === 'nature') title = 'Natureza';
  if (type === 'party') title = 'Festa';
  if (type === 'pool') title = 'Piscina';
  if (type === 'table') title = 'Tomar Uma';

  return title || 'Evento';
};

export const formatDate = (date: Date, locale?: string): string => {
  const handleDate = new Date(date);
  const userLocale = locale || 'pt-BR';

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  const formatedDate = new Intl.DateTimeFormat(userLocale, dateOptions).format(
    handleDate,
  );

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatedTime = handleDate.toLocaleTimeString(userLocale, timeOptions);

  return `${formatedDate}, ${formatedTime}`;
};

export const formatTimeRange = (
  start_time: Date,
  finish_time: Date,
  locale?: string,
): string => {
  let startDate: string;
  const now = new Date();
  const userLocale = locale || 'pt-BR';

  const startDateOptions: Intl.DateTimeFormatOptions = {
    year:
      now.getFullYear() === start_time.getFullYear() ? undefined : '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  startDate = new Intl.DateTimeFormat(userLocale, startDateOptions).format(
    start_time,
  );

  const finishDateOptions: Intl.DateTimeFormatOptions = {
    year:
      now.getFullYear() === finish_time.getFullYear() ? undefined : '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  const finishDate = new Intl.DateTimeFormat(
    userLocale,
    finishDateOptions,
  ).format(finish_time);

  const isSameDay = startDate === finishDate;

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };

  const startTime = start_time.toLocaleTimeString(userLocale, timeOptions);
  const finishTime = finish_time.toLocaleTimeString(userLocale, timeOptions);

  if (
    new Intl.DateTimeFormat(userLocale, startDateOptions).format(now) ===
    startDate
  )
    startDate = `${userLocale === 'pt-BR' ? 'Hoje' : 'Today'}`;

  return `${startDate}, ${startTime} - ${
    !isSameDay && `${finishDate}, `
  }${finishTime}`;
};
