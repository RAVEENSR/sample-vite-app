import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

export function Avatar({ name }: { name: string }) {
  return (
    <AvatarPrimitive.Root className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200')}>
      <AvatarPrimitive.Fallback className="text-sm font-medium">
        {name.charAt(0)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
