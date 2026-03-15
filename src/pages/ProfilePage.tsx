import { PageHeader } from '../components/PageHeader'
import { SectionCard } from '../components/SectionCard'
import type { ShopItem, UserProfile } from '../types/app'
import { createQrMatrix } from '../utils/qr'
import { formatCoins, formatShopCategory, getLevelFromExperience, getLevelProgress } from '../utils/format'

interface ProfilePageProps {
  memberName: string
  user: UserProfile
  items: ShopItem[]
}

export function ProfilePage({ memberName, user, items }: ProfilePageProps) {
  const inventoryItems = items.filter((item) => user.inventory.includes(item.id))
  const equippedItems = inventoryItems.filter((item) => user.equippedItemIds[item.category] === item.id)
  const level = getLevelFromExperience(user.experience)
  const progress = getLevelProgress(user.experience)
  const memberCardLink = `aurora://member/${user.id}`
  const qrMatrix = createQrMatrix(memberCardLink)

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Профиль"
        title={memberName}
        subtitle="Баланс, прогресс, карта гостя и награды, которые уже доступны в кофейне."
        meta={user.tier}
      />

      <SectionCard
        title="Бонусный баланс и прогресс"
        subtitle="Главное по программе лояльности без лишних деталей"
        className="border-[#ecd7c4] bg-[linear-gradient(180deg,#fff8f2,#f6ede3)]"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[24px] border border-[#6f4631] bg-[linear-gradient(180deg,#5a3928,#3d2418)] p-4 text-white shadow-[0_12px_24px_rgba(77,46,30,0.16)]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Бонусный баланс</p>
            <p className="mt-2 text-2xl font-semibold">{formatCoins(user.coins)}</p>
            <p className="mt-1 text-xs text-white/70">баллов доступно сейчас</p>
          </div>
          <div className="rounded-[24px] border border-[#eee0d1] bg-[#fbf4ec] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Прогресс</p>
            <p className="mt-2 text-2xl font-semibold text-ink">Уровень {level}</p>
            <p className="mt-1 text-xs text-slate-500">{progress}/120 до следующего уровня</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Карта гостя"
        subtitle="Покажите бариста перед оплатой: визит подтвердится, а баллы и задания обновятся сразу"
        className="border-[#d8baa1] bg-[linear-gradient(145deg,#5f3b2a,#3c2418_54%,#b47d4d)] text-white shadow-[0_22px_40px_rgba(78,47,31,0.18)]"
      >
        <div className="rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3.5">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#e2c4a7]">Программа лояльности</p>
              <h3 className="mt-2 text-xl font-semibold">Карта гостя</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-6 text-white/82">
                Покажите бариста перед оплатой, чтобы визит, баллы и текущие задания сразу учлись в программе.
              </p>
            </div>
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85">
              {user.tier}
            </span>
          </div>

          <div className="mt-3.5 flex items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4">
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold">{memberName}</p>
              <p className="mt-1 text-sm text-white/78">Участник программы с {user.memberSince}</p>
              <div className="mt-4 space-y-2 text-sm text-white/82">
                <p>Номер карты: {user.id}</p>
                <p>Статус: {user.tier}</p>
                <p className="text-white/72">После подтверждения визита баллы и задания обновляются автоматически.</p>
              </div>
            </div>

            <div className="shrink-0 rounded-[26px] border border-[#eadccf] bg-white p-3 shadow-[0_12px_20px_rgba(77,46,30,0.14)]">
              <svg viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`} className="h-32 w-32" shapeRendering="crispEdges">
                <rect width={qrMatrix.length} height={qrMatrix.length} fill="white" />
                {qrMatrix.flatMap((row, rowIndex) =>
                  row.map((cell, columnIndex) =>
                    cell ? (
                      <rect
                        key={`${rowIndex}-${columnIndex}`}
                        x={columnIndex}
                        y={rowIndex}
                        width="1"
                        height="1"
                        fill="#2f2018"
                      />
                    ) : null,
                  ),
                )}
              </svg>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Активные награды"
        subtitle="Награды, которые уже можно использовать в ближайшем визите или показать как часть статуса"
        className="border-[#ead8c9] bg-[linear-gradient(180deg,#fffaf4,#f4ebdf)]"
      >
        <div className="grid gap-2.5">
          {equippedItems.length > 0 ? (
            equippedItems.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-[#ead8c9] bg-[#fffaf6] p-4 shadow-[0_10px_20px_rgba(93,58,36,0.06)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{item.name}</p>
                    <p className="mt-1 text-[14px] text-[#6d5445]">{item.perk}</p>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                    {formatShopCategory(item.category)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Пока нет активированных наград.</p>
          )}
        </div>
      </SectionCard>
    </div>
  )
}
