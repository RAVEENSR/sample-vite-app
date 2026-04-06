import { formatDate, formatWithTimezone, formatWithDayjs } from '@/lib/dates'

export function TimeInfo() {
  const now = new Date()
  return (
    <div className="space-y-1 text-sm">
      <p>Date (date-fns): {formatDate(now)}</p>
      <p>UTC (date-fns-tz): {formatWithTimezone(now, 'UTC')}</p>
      <p>Date (dayjs): {formatWithDayjs(now)}</p>
    </div>
  )
}
