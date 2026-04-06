import { Avatar } from '@/components/ui/avatar'
import { DataTable } from '@/features/data-table'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/dates'

function App() {
  return (
    <div className={cn('p-4')}>
      <h1>Build Reproduction Test</h1>
      <p>Today: {formatDate(new Date())}</p>
      <Avatar name="Test User" />
      <DataTable />
    </div>
  )
}

export default App
