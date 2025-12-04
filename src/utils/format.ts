export function formatDateTime(value: string): string {
  const date: Date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatSeconds(seconds: number): string {
  const safe: number = Math.max(0, Math.floor(seconds));
  const minutes: number = Math.floor(safe / 60);
  const secs: number = safe % 60;

  const mm: string = minutes.toString().padStart(2, '0');
  const ss: string = secs.toString().padStart(2, '0');

  return `${mm}:${ss}`;
}
