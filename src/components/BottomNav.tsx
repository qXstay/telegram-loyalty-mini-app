import type { ReactNode } from 'react'
import type { AppTab } from '../types/app'

interface BottomNavItem {
  id: AppTab
  label: string
  icon: ReactNode
}

interface BottomNavProps {
  activeTab: AppTab
  items: BottomNavItem[]
  onChange: (tab: AppTab) => void
}

export function BottomNav({ activeTab, items, onChange }: BottomNavProps) {
  const bottomOffset = 'calc(max(env(safe-area-inset-bottom, 0px), var(--tg-safe-area-inset-bottom, 0px)) + 1rem)'

  return (
    <nav
      className="sticky z-20 mt-6 rounded-[28px] border border-[#efdece] bg-[rgba(255,248,241,0.98)] p-2 shadow-[0_16px_34px_rgba(93,58,36,0.12)] backdrop-blur max-[420px]:mt-5 max-[420px]:rounded-[26px] max-[420px]:p-1.5"
      style={{ bottom: bottomOffset }}
    >
      <ul className="grid grid-cols-5 gap-1 max-[420px]:gap-0.5">
        {items.map((item) => {
          const isActive = item.id === activeTab
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange(item.id)}
                className={`flex w-full flex-col items-center gap-1 rounded-[20px] px-2 py-3 text-[11px] font-medium transition max-[420px]:rounded-[18px] max-[420px]:px-1.5 max-[420px]:py-2.5 max-[420px]:text-[10px] ${
                  isActive
                    ? 'bg-espresso text-white shadow-[0_10px_18px_rgba(77,46,30,0.18)]'
                    : 'text-[#816452] hover:bg-[#f7ece1] hover:text-espresso'
                }`}
              >
                <span className="h-5 w-5 max-[420px]:h-4.5 max-[420px]:w-4.5">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
