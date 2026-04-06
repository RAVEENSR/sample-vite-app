import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Popover from '@radix-ui/react-popover'
import { motion } from 'motion/react'
import { Info } from 'lucide-react'

export function TabsDemo() {
  return (
    <div className="space-y-4">
      <NavigationMenu.Root>
        <NavigationMenu.List className="flex gap-2">
          <NavigationMenu.Item>
            <NavigationMenu.Link className="text-sm text-blue-500 hover:underline" href="#">
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="text-sm text-blue-500 hover:underline" href="#">
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs.Root defaultValue="tab1">
          <Tabs.List className="flex gap-1 border-b">
            <Tabs.Trigger value="tab1" className="px-3 py-1 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="px-3 py-1 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500">
              Tab 2
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" className="p-2">
            <ScrollArea.Root className="h-20 overflow-hidden">
              <ScrollArea.Viewport className="h-full w-full">
                <p className="text-sm">Scrollable content area with radix scroll primitives.</p>
                <p className="text-sm mt-2">More content here to demonstrate scrolling behavior.</p>
                <p className="text-sm mt-2">Even more content for the scroll area.</p>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical" className="w-2 bg-gray-100 rounded">
                <ScrollArea.Thumb className="bg-gray-400 rounded" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Tabs.Content>
          <Tabs.Content value="tab2" className="p-2">
            <Popover.Root>
              <Popover.Trigger className="inline-flex items-center gap-1 text-sm text-blue-500">
                <Info size={14} /> Show info
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="bg-white border rounded shadow-lg p-3 text-sm">
                  Popover content
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </Tabs.Content>
        </Tabs.Root>
      </motion.div>
    </div>
  )
}
