const formatTimeRange = (
  date: string,
  time: string,
  finish_date: string,
  finish_time: string,
  locale?: string,
) => {
  const options: Intl.DateTimeFormatOptions = {
    hour12: false,
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  const formattedStartDate = new Intl.DateTimeFormat(
    `${locale || 'pt-BR'}`,
    options,
  ).format(new Date(`${date}T00:00:00`));
  const formattedStartTime = time.replace(/:\d{2}$/, '');

  const formattedFinishDate = new Intl.DateTimeFormat(
    `${locale || 'pt-BR'}`,
    options,
  ).format(new Date(`${finish_date}T00:00:00`));
  const formattedFinishTime = finish_time.replace(/:\d{2}$/, '');

  const startDateTime = `${formattedStartDate}, ${formattedStartTime}`;
  const finishDateTime = `${formattedFinishDate}, ${formattedFinishTime}`;

  if (date === finish_date) {
    return `${startDateTime} - ${formattedFinishTime}`;
  }

  return `${startDateTime} - ${finishDateTime}`;
};

export { formatTimeRange };
