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

// export const formatTimeRange = (
//   start_time: Date,
//   finish_time: Date,
//   locale?: string,
// ): string => {
//   const userLocale = locale || 'pt-BR';

//   const options: Intl.DateTimeFormatOptions = {
//     hour12: false,
//     year: '2-digit',
//     month: '2-digit',
//     day: '2-digit',
//   };

//   const formattedStartDate = new Intl.DateTimeFormat(
//     userLocale,
//     options,
//   ).format(start_time);
//   const formattedStartTime = start_time.toLocaleTimeString(userLocale, {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const formattedFinishDate = new Intl.DateTimeFormat(
//     userLocale,
//     options,
//   ).format(finish_time);
//   const formattedFinishTime = finish_time.toLocaleTimeString(userLocale, {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const startDateTime = `${formattedStartDate}, ${formattedStartTime}`;
//   const finishDateTime = `${formattedFinishDate}, ${formattedFinishTime}`;

//   if (
//     start_time.getFullYear() === finish_time.getFullYear() &&
//     start_time.getMonth() === finish_time.getMonth() &&
//     start_time.getDate() === finish_time.getDate()
//   ) {
//     return `${startDateTime} - ${formattedFinishTime}`;
//   }

//   return `${startDateTime} - ${finishDateTime}`;
// };

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
