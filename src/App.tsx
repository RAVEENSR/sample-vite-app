import { Avatar } from '@/components/ui/avatar'
import { DataTable } from '@/features/data-table'
import { TimeInfo } from '@/features/time-info'
import { DialogDemo } from '@/components/ui/dialog-demo'
import { SelectDemo } from '@/components/ui/select-demo'
import { TabsDemo } from '@/components/ui/tabs-demo'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className={cn('p-4 space-y-4')}>
      <h1 className="text-2xl font-bold">Build Reproduction Test</h1>
      <TimeInfo />
      <Avatar name="Test User" />
      <DialogDemo />
      <SelectDemo />
      <TabsDemo />
      <DataTable />
      <Toaster />
    </div>
  )
}

export default App
