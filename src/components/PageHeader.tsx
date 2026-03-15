interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  meta?: string
}

export function PageHeader({ eyebrow, title, subtitle, meta }: PageHeaderProps) {
  return (
    <header className="space-y-3.5 max-[420px]:space-y-3">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[#edd8c4] bg-[#fff8f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a654d] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          {eyebrow}
        </span>
        {meta ? (
          <span className="rounded-full border border-[#e8d3bf] bg-[#f9eee2] px-3 py-1 text-xs font-medium text-[#7a5a42] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            {meta}
          </span>
        ) : null}
      </div>
      <div>
        <h1 className="text-[30px] font-semibold tracking-[-0.05em] text-ink max-[420px]:text-[27px] max-[380px]:text-[25px]">
          {title}
        </h1>
        <p className="mt-2.5 max-w-[22rem] text-[14px] leading-6 text-[#6d5445] max-[420px]:mt-2 max-[420px]:text-[13px] max-[420px]:leading-5">
          {subtitle}
        </p>
      </div>
    </header>
  )
}
