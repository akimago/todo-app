import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

export function formatDueDate(dateString: string): string {
  const date = parseISO(dateString);

  if (isToday(date)) return '今日';
  if (isTomorrow(date)) return '明日';

  return format(date, 'M/d (E)', { locale: ja });
}

export function isOverdue(dateString: string): boolean {
  const date = parseISO(dateString);
  return isPast(date) && !isToday(date);
}

export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}
