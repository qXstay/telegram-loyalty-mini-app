import type { ComponentProps } from 'react'

type IconProps = ComponentProps<'svg'>

function BaseIcon({ children, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.5V20h13V10.5" />
    </BaseIcon>
  )
}

export function TaskIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8.5 12 2.2 2.2L15.5 9.5" />
    </BaseIcon>
  )
}

export function ShopIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 8.5h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" />
      <path d="M8 8.5V7a4 4 0 1 1 8 0v1.5" />
    </BaseIcon>
  )
}

export function OfferIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 14.9 8.9 21 12l-6.1 3.1L12 21l-2.9-5.9L3 12l6.1-3.1z" />
    </BaseIcon>
  )
}

export function ProfileIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.8-3 4.1-4.5 7-4.5s5.2 1.5 7 4.5" />
    </BaseIcon>
  )
}

export function CoinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="12" rx="7" ry="9" />
      <path d="M9.5 9.5c.7-.8 1.6-1.2 2.8-1.2 1.8 0 3 .8 3 2.1 0 1.2-.9 1.8-2.5 2.2-1.6.4-2.7.8-2.7 2.2 0 1.3 1.2 2.1 2.9 2.1 1.1 0 2.1-.3 2.9-1" />
    </BaseIcon>
  )
}

export function FlameIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12.5 3c.8 2.4-.6 3.8-1.6 5.4-1 1.5-1.5 2.6-1.5 4.1A4.6 4.6 0 0 0 14 17a4.8 4.8 0 0 0 4.6-4.9c0-2.5-1.5-4.3-3.3-5.9-.4 1.2-1 2.3-2.8 3.2.5-2.1.1-4.4-2-6.4Z" />
      <path d="M12 13.5c-1.1 1-1.6 1.9-1.6 3A2.6 2.6 0 0 0 13 19a2.7 2.7 0 0 0 2.7-2.7c0-1.2-.7-2.3-1.8-3.6-.1.8-.5 1.5-1.9 2.2Z" />
    </BaseIcon>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />
    </BaseIcon>
  )
}
