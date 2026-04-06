import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { X } from 'lucide-react'

export function DialogDemo() {
  return (
    <div className="flex gap-2">
      <Dialog.Root>
        <Dialog.Trigger className="px-3 py-1 bg-blue-500 text-white rounded">
          Open Dialog
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
            <Dialog.Title className="text-lg font-bold">Dialog Title</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">Dialog content</Dialog.Description>
            <Dialog.Close className="absolute top-2 right-2">
              <X size={16} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <AlertDialog.Root>
        <AlertDialog.Trigger className="px-3 py-1 bg-red-500 text-white rounded">
          Alert
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
            <AlertDialog.Title className="text-lg font-bold">Are you sure?</AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-gray-500">This action cannot be undone.</AlertDialog.Description>
            <div className="flex gap-2 mt-4">
              <AlertDialog.Cancel className="px-3 py-1 border rounded">Cancel</AlertDialog.Cancel>
              <AlertDialog.Action className="px-3 py-1 bg-red-500 text-white rounded">Confirm</AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}
