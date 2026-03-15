interface QuickAction {
  label: string
  caption: string
  badge?: string
  className?: string
  onClick: () => void
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={action.onClick}
          className={`rounded-[24px] border p-4 text-left shadow-soft transition hover:-translate-y-0.5 ${action.className ?? 'border-white/70 bg-white/70 hover:bg-white'}`}
        >
          {action.badge && (
            <span className="inline-flex rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a654d]">
              {action.badge}
            </span>
          )}
          <p className="text-sm font-semibold text-ink">{action.label}</p>
          <p className="mt-1 text-sm leading-6 text-[#6d5445]">{action.caption}</p>
        </button>
      ))}
    </div>
  )
}
