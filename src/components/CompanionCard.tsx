import type { CompanionProfile } from '../types/app'
import { SparkIcon } from './icons'
import { SectionCard } from './SectionCard'

interface CompanionCardProps {
  companion: CompanionProfile
}

export function CompanionCard({ companion }: CompanionCardProps) {
  return (
    <SectionCard className="overflow-hidden border-[#f0ddcb] bg-[linear-gradient(135deg,rgba(224,196,170,0.58),rgba(255,249,243,0.98),rgba(164,118,83,0.12))]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,#69422d,#3d2418)] text-white shadow-soft">
          <SparkIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink">{companion.name}</h2>
            <span className="rounded-full bg-[#fff7ef] px-2.5 py-1 text-xs font-medium text-[#8a654d]">
              {companion.role}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#6d5445]">{companion.focus}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/80 bg-white/70 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b7963]">Что выгодно сегодня</p>
              <p className="mt-2 text-sm font-medium text-ink">{companion.mood}</p>
              <p className="mt-1 text-sm text-[#6d5445]">{companion.tagline}</p>
            </div>
            <div className="rounded-2xl border border-[#7b533a] bg-[linear-gradient(180deg,#5f3927,#3d2418)] p-3 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9bc9e]">Следующая привилегия</p>
              <p className="mt-2 text-sm leading-6 text-white/85">{companion.nextMilestone}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
