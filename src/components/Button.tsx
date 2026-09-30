import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg' | 'icon'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent/92',
  secondary: 'border border-line bg-elevated text-ink hover:bg-subtle/60',
  ghost: 'bg-transparent text-ink hover:bg-subtle/60',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-4',
  lg: 'h-12 px-5',
  icon: 'size-11',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className = '', type = 'button', ...rest }: Props) {
  return (
    <button
      type={type}
      className={`press inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  )
}
