import type { ShopItem } from '../types/app'

interface InventoryCardProps {
  title: string
  items: ShopItem[]
  emptyLabel: string
}

export function InventoryCard({ title, items, emptyLabel }: InventoryCardProps) {
  return (
    <div className="rounded-[24px] border border-[#ece2d7] bg-[#fcfaf7] p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</h3>
      {items.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item.id}
              className="rounded-full border border-white bg-white px-3 py-2 text-sm font-medium text-ink"
            >
              {item.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500">{emptyLabel}</p>
      )}
    </div>
  )
}
