import type { PropsWithChildren, ReactNode } from 'react'

interface SectionCardProps extends PropsWithChildren {
  title?: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export function SectionCard({
  title,
  subtitle,
  action,
  className = '',
  children,
}: SectionCardProps) {
  return (
    <section
      className={`rounded-[28px] border border-[#ecdccd] bg-[rgba(255,250,245,0.94)] p-5 shadow-[0_14px_34px_rgba(93,58,36,0.08)] backdrop-blur max-[420px]:rounded-[26px] max-[420px]:p-4 ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="mb-4 flex items-start justify-between gap-3 max-[420px]:mb-3.5">
          <div>
            {title && <h2 className="text-[18px] font-semibold tracking-[-0.025em] text-ink max-[420px]:text-[17px]">{title}</h2>}
            {subtitle && (
              <p className="mt-1.5 max-w-[22rem] text-[14px] leading-6 text-[#735848] max-[420px]:text-[13px] max-[420px]:leading-5">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
