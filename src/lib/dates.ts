import { format, parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import dayjs from 'dayjs'

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function formatWithTimezone(date: Date, tz: string): string {
  return formatInTimeZone(date, tz, 'yyyy-MM-dd HH:mm:ss zzz')
}

export function formatWithDayjs(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD')
}

export function parseDate(dateStr: string): Date {
  return parseISO(dateStr)
}
