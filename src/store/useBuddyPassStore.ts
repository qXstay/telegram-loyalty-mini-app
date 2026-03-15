import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'
import { mockCompanion, mockOffers, mockShopItems, mockTasks, mockUser } from '../data/mockData'
import type { AppTab, CompanionProfile, Offer, ShopItem, Task, UserProfile } from '../types/app'

interface BuddyPassState {
  activeTab: AppTab
  user: UserProfile
  companion: CompanionProfile
  tasks: Task[]
  shopItems: ShopItem[]
  offers: Offer[]
  setActiveTab: (tab: AppTab) => void
  completeTask: (taskId: string) => void
  claimTaskReward: (taskId: string) => void
  buyItem: (itemId: string) => void
  equipItem: (itemId: string) => void
}

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
}

function getStorage(): StateStorage {
  return typeof window !== 'undefined' ? localStorage : noopStorage
}

export const useBuddyPassStore = create<BuddyPassState>()(
  persist(
    (set) => ({
      activeTab: 'home',
      user: mockUser,
      companion: mockCompanion,
      tasks: mockTasks,
      shopItems: mockShopItems,
      offers: mockOffers,
      setActiveTab: (tab) => set({ activeTab: tab }),
      completeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId && task.status === 'available'
              ? { ...task, status: 'completed' }
              : task,
          ),
        })),
      claimTaskReward: (taskId) =>
        set((state) => {
          const task = state.tasks.find((entry) => entry.id === taskId)
          if (!task || task.status !== 'completed') {
            return state
          }

          return {
            user: {
              ...state.user,
              coins: state.user.coins + task.reward,
              experience: state.user.experience + task.reward,
              tasksClaimed: state.user.tasksClaimed + 1,
            },
            tasks: state.tasks.map((entry) =>
              entry.id === taskId ? { ...entry, status: 'claimed' } : entry,
            ),
          }
        }),
      buyItem: (itemId) =>
        set((state) => {
          const item = state.shopItems.find((entry) => entry.id === itemId)
          if (!item || state.user.inventory.includes(itemId) || state.user.coins < item.price) {
            return state
          }

          return {
            user: {
              ...state.user,
              coins: state.user.coins - item.price,
              purchases: state.user.purchases + 1,
              inventory: [...state.user.inventory, itemId],
            },
          }
        }),
      equipItem: (itemId) =>
        set((state) => {
          const item = state.shopItems.find((entry) => entry.id === itemId)
          if (!item || !state.user.inventory.includes(itemId)) {
            return state
          }

          return {
            user: {
              ...state.user,
              equippedItemIds: {
                ...state.user.equippedItemIds,
                [item.category]: itemId,
              },
            },
          }
        }),
    }),
    {
      name: 'buddy-pass-store',
      storage: createJSONStorage(getStorage),
    },
  ),
)
