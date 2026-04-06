import * as Select from '@radix-ui/react-select'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Switch from '@radix-ui/react-switch'
import * as Label from '@radix-ui/react-label'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Check, ChevronDown } from 'lucide-react'

export function SelectDemo() {
  return (
    <div className="flex gap-4 items-center">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Select.Root>
              <Select.Trigger className="inline-flex items-center gap-1 px-3 py-1 border rounded">
                <Select.Value placeholder="Select..." />
                <Select.Icon><ChevronDown size={14} /></Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white border rounded shadow-lg p-1">
                  <Select.Viewport>
                    <Select.Item value="a" className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded">
                      <Select.ItemText>Option A</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="b" className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded">
                      <Select.ItemText>Option B</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Pick an option
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>

      <div className="flex items-center gap-2">
        <Checkbox.Root className="h-5 w-5 border rounded flex items-center justify-center" id="check">
          <Checkbox.Indicator><Check size={14} /></Checkbox.Indicator>
        </Checkbox.Root>
        <Label.Root htmlFor="check" className="text-sm">Agree</Label.Root>
      </div>

      <div className="flex items-center gap-2">
        <Switch.Root className="w-10 h-5 bg-gray-300 rounded-full relative" id="switch">
          <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
        </Switch.Root>
        <Label.Root htmlFor="switch" className="text-sm">Toggle</Label.Root>
      </div>
    </div>
  )
}
