const formatTimeRange = (
  date: string,
  time: string,
  finish_date: string,
  finish_time: string,
  locale?: string,
) => {
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  let formattedStartDate = new Date(date);
  formattedStartDate = formattedStartDate.toLocaleDateString(
    locale || 'pt-BR',
    options,
  ) as unknown as Date;
  const formattedStartTime = time.replace(/:\d{2}$/, '');

  let formattedFinishDate = new Date(finish_date);
  formattedFinishDate = formattedFinishDate.toLocaleDateString(
    locale || 'pt-BR',
    {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    },
  ) as unknown as Date;
  const formattedFinishTime = finish_time.replace(/:\d{2}$/, '');

  const startDateTime = `${formattedStartDate}, ${formattedStartTime}`;
  const finishDateTime = `${formattedFinishDate}, ${formattedFinishTime}`;

  if (date === finish_date) {
    return `${startDateTime} - ${formattedFinishTime}`;
  }

  return `${startDateTime} - ${finishDateTime}`;
};

export { formatTimeRange };
