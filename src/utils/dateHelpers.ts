const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

export const formatDate = (date: string): string => formatter.format(new Date(date));

