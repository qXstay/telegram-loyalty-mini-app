import { PageHeader } from '../components/PageHeader'
import { SectionCard } from '../components/SectionCard'
import type { AppTab, ShopItem, Task, UserProfile } from '../types/app'
import { formatCoins } from '../utils/format'

interface HomePageProps {
  heroName: string
  user: UserProfile
  tasks: Task[]
  shopItems: ShopItem[]
  onNavigate: (tab: AppTab) => void
}

export function HomePage({
  heroName,
  user,
  tasks,
  shopItems,
  onNavigate,
}: HomePageProps) {
  const activeTasks = tasks.filter((task) => task.status !== 'claimed').slice(0, 2)
  const claimableTask = tasks.find((task) => task.status === 'completed') ?? null
  const nextReward =
    [...shopItems]
      .filter((item) => !user.inventory.includes(item.id) && item.price > user.coins)
      .sort((left, right) => left.price - right.price)[0] ??
    [...shopItems]
      .filter((item) => !user.inventory.includes(item.id))
      .sort((left, right) => left.price - right.price)[0] ??
    null
  const pointsToNextReward = nextReward ? Math.max(nextReward.price - user.coins, 0) : 0
  const nextRewardProgress = nextReward ? Math.min((user.coins / nextReward.price) * 100, 100) : 100
  const seasonalTask = tasks.find((task) => task.id === 'menu-highlight') ?? null
  const seasonalOffer = {
    title: 'Сезонный мокачино',
    description: 'Напиток недели с мягким шоколадным вкусом и дополнительными баллами за заказ.',
    image: '/images/seasonal-mokachino.jpg',
  }

  return (
    <div className="space-y-4 max-[420px]:space-y-3.5">
      <PageHeader
        eyebrow="Программа лояльности"
        title="Программа лояльности кофейни Aurora"
        subtitle="Здесь видно бонусы, ближайшую награду и то, что выгодно сделать сегодня."
      />

      <section className="overflow-hidden rounded-[30px] border border-[#d9b79c] bg-[linear-gradient(155deg,#6b4330_0%,#4a2f22_46%,#b77f4d_100%)] p-4 text-white shadow-[0_22px_40px_rgba(78,47,31,0.2)] max-[420px]:rounded-[28px] max-[420px]:p-3.5">
        <div className="flex items-start justify-between gap-4 max-[420px]:gap-3">
          <div className="min-w-0 flex-1">
            <span className="inline-flex rounded-full border border-white/12 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3ddc6]">
              Кофейня Aurora
            </span>
            <h2 className="mt-3 text-[29px] font-semibold tracking-[-0.05em] max-[420px]:mt-2.5 max-[420px]:text-[25px] max-[380px]:text-[23px]">
              Рады видеть снова, {heroName}
            </h2>
            <p className="mt-2 max-w-[248px] text-[14px] leading-6 text-white/78 max-[420px]:max-w-[220px] max-[420px]:text-[13px] max-[420px]:leading-5">
              Здесь видно бонусный баланс, ближайшую награду и всё, что особенно выгодно сегодня.
            </p>
          </div>
          <div className="rounded-[22px] border border-white/12 bg-white/10 px-4 py-3.5 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur max-[420px]:px-3 max-[420px]:py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">Бонусный баланс</p>
            <p className="mt-2 text-[32px] font-semibold leading-none max-[420px]:text-[28px]">{formatCoins(user.coins)}</p>
            <p className="mt-1 text-xs text-white/70">баллов доступно</p>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur max-[420px]:mt-3 max-[420px]:p-3.5">
          <div className="flex items-center justify-between gap-3 max-[420px]:items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Следующая награда</p>
              <p className="mt-2 text-[17px] font-semibold tracking-[-0.02em] max-[420px]:text-[16px]">{nextReward?.name ?? 'Все награды уже открыты'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {pointsToNextReward > 0 ? `${formatCoins(pointsToNextReward)} баллов` : 'Можно забрать сейчас'}
              </p>
              <p className="mt-1 text-xs text-white/65">до следующей награды</p>
            </div>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#f5d2b2,#fff4e7)]"
              style={{ width: `${nextRewardProgress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-[#e3d7ca] bg-[linear-gradient(180deg,#faf4ed,#eef1e4)] p-4 shadow-[0_14px_26px_rgba(93,58,36,0.07)] max-[420px]:p-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="rounded-full bg-[#fbf4ec] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f6448]">
            Сегодня в кофейне
          </p>
          <p className="rounded-full bg-[#eef1e4] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7b8662]">
            Сегодня выгодно
          </p>
        </div>
        <div className="relative -mx-1 mt-3 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(255,248,240,0.88),rgba(244,233,223,0.62))] max-[420px]:mt-2.5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto h-5 w-24 rounded-full bg-[rgba(146,98,62,0.16)] blur-xl" />
          <img
            src={seasonalOffer.image}
            alt={seasonalOffer.title}
            className="h-[9.15rem] w-full object-contain object-center px-1 pt-1.5 scale-[1.24] translate-y-1 drop-shadow-[0_22px_24px_rgba(88,55,35,0.18)] max-[420px]:h-[8.4rem] max-[420px]:scale-[1.2]"
          />
        </div>
        <h3 className="mt-2.5 text-[18px] font-semibold tracking-[-0.025em] text-ink max-[420px]:text-[17px]">{seasonalOffer.title}</h3>
        <p className="mt-1.5 text-[14px] leading-6 text-[#5f634d] max-[420px]:text-[13px] max-[420px]:leading-5">
          {claimableTask
            ? `Напиток уже отмечен в заданиях. Откройте раздел и заберите ${claimableTask.reward} баллов.`
            : seasonalTask
              ? `Закажите напиток недели и получите ${seasonalTask.reward} баллов. Это самый быстрый шаг к следующей награде.`
              : seasonalOffer.description}
        </p>
      </section>

      <SectionCard
        title="Следующая награда"
        subtitle="Понятная цель по баллам и то, что можно получить уже в ближайших визитах"
        className="border-[#eddccc] bg-[linear-gradient(180deg,#fff9f3,#f7ede3)]"
      >
        <div className="flex items-start justify-between gap-4 max-[420px]:gap-3">
          <div className="min-w-0">
            <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-ink max-[420px]:text-[17px]">{nextReward?.name ?? 'Каталог открыт'}</h3>
            <p className="mt-2 text-[14px] leading-6 text-[#6d5445] max-[420px]:text-[13px] max-[420px]:leading-5">
              {nextReward
                ? pointsToNextReward > 0
                  ? `Осталось ${formatCoins(pointsToNextReward)} баллов, чтобы забрать эту награду.`
                  : 'Эту награду уже можно забрать в каталоге.'
                : 'У вас уже собрана вся подборка наград.'}
            </p>
          </div>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="shrink-0 rounded-[18px] bg-espresso px-4 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_18px_rgba(77,46,30,0.18)] max-[420px]:px-3.5 max-[420px]:py-3 max-[420px]:text-[14px]"
            >
              К наградам
            </button>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#ead9cb]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#c68c5d,#8f5c39)]"
            style={{ width: `${nextRewardProgress}%` }}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Актуальные действия"
        subtitle="Два понятных шага, которые сейчас дают максимальную пользу"
        className="border-[#ecd8c5] bg-[linear-gradient(180deg,#fff8f1,#f8ede1)]"
      >
        <div className="space-y-2.5 max-[420px]:space-y-2">
          {activeTasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => onNavigate('tasks')}
              className="flex w-full items-center justify-between gap-3 rounded-[22px] border border-[#ead9ca] bg-[#fffaf6] p-4 shadow-[0_8px_18px_rgba(93,58,36,0.05)] text-left max-[420px]:gap-2.5 max-[420px]:p-3.5"
            >
              <div>
                <p className="text-[15px] font-semibold text-ink">{task.title}</p>
                <p className="mt-1 text-[14px] text-[#6d5445] max-[420px]:text-[13px]">{task.description}</p>
              </div>
              <span className="rounded-full border border-[#efe0d3] bg-white px-3 py-2 text-sm font-semibold text-espresso max-[420px]:px-2.5 max-[420px]:py-1.5 max-[420px]:text-[13px]">
                +{task.reward} б.
              </span>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
