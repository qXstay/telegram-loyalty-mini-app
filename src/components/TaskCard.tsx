import type { Task } from '../types/app'
import { formatPoints, formatTaskFrequency, formatTaskStatus } from '../utils/format'

interface TaskCardProps {
  task: Task
  onComplete: () => void
  onClaim: () => void
}

function getStatusTone(status: Task['status']) {
  switch (status) {
    case 'available':
      return 'bg-slate-100 text-slate-600'
    case 'completed':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-amber-100 text-amber-700'
  }
}

export function TaskCard({ task, onComplete, onClaim }: TaskCardProps) {
  const actionLabel =
    task.status === 'available'
      ? 'Отметить выполнение'
      : task.status === 'completed'
        ? `Забрать ${formatPoints(task.reward)}`
        : 'Награда получена'

  return (
    <article className="rounded-[24px] border border-[#e7d5c4] bg-[linear-gradient(180deg,#fffaf6,#f7eee5)] p-4 shadow-[0_12px_24px_rgba(93,58,36,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusTone(task.status)}`}>
              {formatTaskStatus(task.status)}
            </span>
          </div>
          <h3 className="mt-3 text-[16px] font-semibold tracking-[-0.02em] text-ink">{task.title}</h3>
          <p className="mt-2 text-[14px] leading-6 text-[#6d5445]">{task.description}</p>
        </div>
        <div className="shrink-0 rounded-[20px] border border-[#6e4732] bg-[linear-gradient(180deg,#6b4430,#43281b)] px-3.5 py-3 text-right text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#ddc1a6]">{formatTaskFrequency(task.frequency)}</p>
          <p className="mt-1 text-[17px] font-semibold">{task.reward} б.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={task.status === 'available' ? onComplete : onClaim}
        disabled={task.status === 'claimed'}
        className={`mt-4 w-full rounded-[18px] px-4 py-3.5 text-[15px] font-semibold transition ${
          task.status === 'claimed'
            ? 'cursor-not-allowed border border-[#e3d6ca] bg-[#efe6de] text-[#8a7364]'
            : task.status === 'completed'
              ? 'bg-[#7c8a63] text-white shadow-[0_10px_18px_rgba(101,120,74,0.18)] hover:bg-[#6f7d58]'
              : 'bg-espresso text-white shadow-[0_10px_18px_rgba(77,46,30,0.18)] hover:bg-[#3d2418]'
        }`}
      >
        {actionLabel}
      </button>
    </article>
  )
}
