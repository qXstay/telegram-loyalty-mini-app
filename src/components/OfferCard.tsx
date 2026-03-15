import type { Offer } from '../types/app'
import { formatOfferStatus } from '../utils/format'

interface OfferCardProps {
  offer: Offer
}

function getStatusClass(status: Offer['status']) {
  switch (status) {
    case 'active':
      return 'border border-[#d9e4c9] bg-[#f0f5e7] text-[#64734a]'
    case 'new':
      return 'border border-[#eed5c3] bg-[#f6e7db] text-[#8c6346]'
    default:
      return 'border border-[#e8ddd4] bg-[#efe7df] text-[#7b6758]'
  }
}

export function OfferCard({ offer }: OfferCardProps) {
  const isActive = offer.status === 'active'
  const cardClass = isActive
    ? 'border-[#dcc6b3] bg-[linear-gradient(180deg,#fffaf4,#f2ebdf)] shadow-[0_18px_30px_rgba(93,58,36,0.11)] ring-1 ring-[rgba(214,185,156,0.32)]'
    : offer.status === 'new'
      ? 'border-[#ead6c6] bg-[rgba(255,248,242,0.96)] shadow-[0_14px_28px_rgba(93,58,36,0.08)]'
      : 'border-[#e5d9cf] bg-[rgba(252,247,242,0.95)] shadow-[0_12px_24px_rgba(93,58,36,0.06)]'
  const panelClass = isActive
    ? 'border-[#e5d8c9] bg-[linear-gradient(180deg,#f8f1e7,#efe6da)]'
    : 'border-[#eddccf] bg-[linear-gradient(180deg,#fdf4ec,#f4e8dc)]'

  return (
    <article className={`rounded-[26px] border p-5 backdrop-blur ${cardClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {isActive ? (
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6b51]">Сейчас доступно</p>
          ) : null}
          <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-ink">{offer.title}</h3>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(offer.status)}`}>
          {formatOfferStatus(offer.status)}
        </span>
      </div>
      <p className="mt-3.5 text-[14px] leading-6 text-[#6d5445]">{offer.summary}</p>
      <div className={`mt-4 grid gap-4 rounded-[22px] border p-[18px] ${panelClass}`}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b7963]">Когда доступно</p>
          <p className="mt-2 text-sm leading-6 text-ink">{offer.requirement}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b7963]">Что даёт</p>
          <p className="mt-2 text-sm leading-6 text-ink">{offer.reward}</p>
        </div>
      </div>
    </article>
  )
}
