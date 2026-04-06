import * as AvatarPrimitive from '@radix-ui/react-avatar'

export function Avatar({ name }: { name: string }) {
  return (
    <AvatarPrimitive.Root>
      <AvatarPrimitive.Fallback>{name.charAt(0)}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
