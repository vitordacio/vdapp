// export const formatTimeRange = (
//   date: string,
//   time: string,
//   finish_date: string,
//   finish_time: string,
//   locale?: string,
// ) => {
//   const options: Intl.DateTimeFormatOptions = {
//     hour12: false,
//     year: '2-digit',
//     month: '2-digit',
//     day: '2-digit',
//   };

//   const formattedStartDate = new Intl.DateTimeFormat(
//     `${locale || 'pt-BR'}`,
//     options,
//   ).format(new Date(`${date}T00:00:00`));
//   const formattedStartTime = time.replace(/:\d{2}$/, '');

//   const formattedFinishDate = new Intl.DateTimeFormat(
//     `${locale || 'pt-BR'}`,
//     options,
//   ).format(new Date(`${finish_date}T00:00:00`));
//   const formattedFinishTime = finish_time.replace(/:\d{2}$/, '');

//   const startDateTime = `${formattedStartDate}, ${formattedStartTime}`;
//   const finishDateTime = `${formattedFinishDate}, ${formattedFinishTime}`;

//   if (date === finish_date) {
//     return `${startDateTime} - ${formattedFinishTime}`;
//   }

//   return `${startDateTime} - ${finishDateTime}`;
// };

// export const formatTimeRange = (
//   start_time: Date,
//   finish_time: Date,
//   locale?: string,
// ): string => {
//   const options: Intl.DateTimeFormatOptions = {
//     hour12: false,
//     year: '2-digit',
//     month: '2-digit',
//     day: '2-digit',
//   };

//   const formattedStartDate = new Intl.DateTimeFormat(
//     `${locale || 'pt-BR'}`,
//     options,
//   ).format(start_time);
//   const formattedStartTime = start_time.toLocaleTimeString(locale, {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const formattedFinishDate = new Intl.DateTimeFormat(
//     `${locale || 'pt-BR'}`,
//     options,
//   ).format(finish_time);
//   const formattedFinishTime = finish_time.toLocaleTimeString(locale, {
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
  const userLocale = locale || 'pt-BR';

  const options: Intl.DateTimeFormatOptions = {
    hour12: false,
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  const formattedStartDate = new Intl.DateTimeFormat(
    userLocale,
    options,
  ).format(start_time);
  const formattedStartTime = start_time.toLocaleTimeString(userLocale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedFinishDate = new Intl.DateTimeFormat(
    userLocale,
    options,
  ).format(finish_time);
  const formattedFinishTime = finish_time.toLocaleTimeString(userLocale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const startDateTime = `${formattedStartDate}, ${formattedStartTime}`;
  const finishDateTime = `${formattedFinishDate}, ${formattedFinishTime}`;

  if (
    start_time.getFullYear() === finish_time.getFullYear() &&
    start_time.getMonth() === finish_time.getMonth() &&
    start_time.getDate() === finish_time.getDate()
  ) {
    return `${startDateTime} - ${formattedFinishTime}`;
  }

  return `${startDateTime} - ${finishDateTime}`;
};
