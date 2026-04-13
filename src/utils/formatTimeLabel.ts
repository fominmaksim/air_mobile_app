export const formatTimeLabel = (value?: string) => {
  if (value && value !== '') {
    const date = new Date(value);

    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');

    return `${h}:${m}`;
  } else {
    return '';
  }
};
