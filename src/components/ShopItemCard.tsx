import type { ShopItem } from '../types/app'
import { formatCoins, formatShopCategory } from '../utils/format'

interface ShopItemCardProps {
  item: ShopItem
  owned: boolean
  equipped: boolean
  canAfford: boolean
  onBuy: () => void
  onEquip: () => void
}

export function ShopItemCard({
  item,
  owned,
  equipped,
  canAfford,
  onBuy,
  onEquip,
}: ShopItemCardProps) {
  const buttonLabel = equipped ? 'Уже активировано' : owned ? 'Активировать награду' : `Взять за ${formatCoins(item.price)}`
  const buttonClass = equipped
    ? 'border border-[#e3d6ca] bg-[#efe6de] text-[#8a7364] cursor-default'
    : owned
      ? 'bg-espresso text-white shadow-[0_10px_18px_rgba(77,46,30,0.18)] hover:bg-[#3d2418]'
      : canAfford
        ? 'bg-[#7c8a63] text-white shadow-[0_10px_18px_rgba(101,120,74,0.18)] hover:bg-[#6f7d58]'
        : 'border border-[#e3d6ca] bg-[#efe6de] text-[#8a7364] cursor-not-allowed'

  return (
    <article className="rounded-[26px] border border-[#ead8c8] bg-[rgba(255,250,245,0.98)] p-4 shadow-[0_14px_28px_rgba(93,58,36,0.08)]">
      {item.image && (
        <div className="relative mb-4 overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#fff8f1,#f3e7da)] shadow-[0_10px_20px_rgba(93,58,36,0.08)] ring-1 ring-[#eee1d2]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto h-5 w-24 rounded-full bg-[rgba(146,98,62,0.12)] blur-xl" />
          <img
            src={item.image}
            alt={item.name}
            className="h-[9.35rem] w-full object-contain object-center px-1 pt-1.5 scale-[1.18] translate-y-1 drop-shadow-[0_20px_22px_rgba(88,55,35,0.16)]"
          />
        </div>
      )}
      <div className={`rounded-[22px] bg-gradient-to-br ${item.accent} p-4 ring-1 ring-white/70`}>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a654d]">
            {formatShopCategory(item.category)}
          </span>
          <span className="rounded-full bg-espresso px-2.5 py-1 text-sm font-semibold text-white">
            {formatCoins(item.price)} б.
          </span>
        </div>
        <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.025em] text-ink">{item.name}</h3>
        <p className="mt-2 text-[14px] leading-6 text-[#684d3e]">{item.description}</p>
      </div>
      <div className="mt-4 space-y-3">
        <p className="text-[14px] leading-6 text-[#6d5445]">{item.perk}</p>
        <button
          type="button"
          onClick={owned ? onEquip : onBuy}
          disabled={equipped || (!owned && !canAfford)}
          className={`w-full rounded-[18px] px-4 py-3.5 text-[15px] font-semibold transition ${buttonClass}`}
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  )
}
