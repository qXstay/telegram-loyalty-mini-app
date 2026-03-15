import type { ReactNode } from 'react'
import { BottomNav } from './components/BottomNav'
import {
  HomeIcon,
  OfferIcon,
  ProfileIcon,
  ShopIcon,
  TaskIcon,
} from './components/icons'
import { useTelegramApp } from './hooks/useTelegramApp'
import { HomePage } from './pages/HomePage'
import { OffersPage } from './pages/OffersPage'
import { ProfilePage } from './pages/ProfilePage'
import { ShopPage } from './pages/ShopPage'
import { TasksPage } from './pages/TasksPage'
import { useBuddyPassStore } from './store/useBuddyPassStore'
import type { AppTab } from './types/app'

const navigationItems = [
  { id: 'home', label: 'Главная', icon: <HomeIcon className="h-5 w-5" /> },
  { id: 'tasks', label: 'Задания', icon: <TaskIcon className="h-5 w-5" /> },
  { id: 'shop', label: 'Награды', icon: <ShopIcon className="h-5 w-5" /> },
  { id: 'offers', label: 'Привилегии', icon: <OfferIcon className="h-5 w-5" /> },
  { id: 'profile', label: 'Профиль', icon: <ProfileIcon className="h-5 w-5" /> },
] satisfies Array<{ id: AppTab; label: string; icon: ReactNode }>

function App() {
  const activeTab = useBuddyPassStore((state) => state.activeTab)
  const user = useBuddyPassStore((state) => state.user)
  const tasks = useBuddyPassStore((state) => state.tasks)
  const shopItems = useBuddyPassStore((state) => state.shopItems)
  const offers = useBuddyPassStore((state) => state.offers)
  const setActiveTab = useBuddyPassStore((state) => state.setActiveTab)
  const completeTask = useBuddyPassStore((state) => state.completeTask)
  const claimTaskReward = useBuddyPassStore((state) => state.claimTaskReward)
  const buyItem = useBuddyPassStore((state) => state.buyItem)
  const equipItem = useBuddyPassStore((state) => state.equipItem)
  const telegram = useTelegramApp()

  const memberName = telegram.displayName ?? user.name
  const heroName = telegram.firstName ?? user.name.split(' ')[0] ?? user.name
  const mainSafeArea = `calc(max(env(safe-area-inset-bottom, 0px), var(--tg-content-safe-area-inset-bottom, 0px)) + 6.5rem)`

  return (
    <div className="min-h-screen bg-app-glow text-ink">
      <div className="mx-auto min-h-screen max-w-[430px] px-4 pb-6 pt-5 max-[420px]:pb-5 max-[420px]:pt-4">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-[430px] rounded-b-[52px] bg-[radial-gradient(circle_at_top,rgba(191,135,84,0.22),rgba(255,255,255,0)_74%)]" />
        <div className="relative flex min-h-[calc(100vh-2.5rem)] flex-col">
          <div className="mb-5 flex items-center rounded-[26px] border border-[#efddcc] bg-[rgba(255,248,241,0.9)] px-4 py-3 shadow-[0_12px_28px_rgba(93,58,36,0.08)] backdrop-blur max-[420px]:mb-4 max-[420px]:px-3.5 max-[420px]:py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#d09c6d,#5e3926)] text-sm font-semibold text-white shadow-[0_8px_18px_rgba(77,46,30,0.16)]">
                А
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9b7963]">Кофейня Aurora</p>
                <p className="mt-1 text-sm font-medium text-ink">Карта гостя: {memberName}</p>
              </div>
            </div>
          </div>

          <main className="flex-1" style={{ paddingBottom: mainSafeArea }}>
            {activeTab === 'home' && (
              <HomePage
                heroName={heroName}
                user={user}
                tasks={tasks}
                shopItems={shopItems}
                onNavigate={setActiveTab}
              />
            )}
            {activeTab === 'tasks' && (
              <TasksPage
                tasks={tasks}
                onCompleteTask={completeTask}
                onClaimTask={claimTaskReward}
              />
            )}
            {activeTab === 'shop' && (
              <ShopPage
                user={user}
                items={shopItems}
                onBuyItem={buyItem}
                onEquipItem={equipItem}
              />
            )}
            {activeTab === 'offers' && <OffersPage offers={offers} />}
            {activeTab === 'profile' && <ProfilePage memberName={memberName} user={user} items={shopItems} />}
          </main>

          <BottomNav activeTab={activeTab} items={navigationItems} onChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}

export default App
