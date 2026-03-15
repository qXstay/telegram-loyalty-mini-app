export type AppTab = 'home' | 'tasks' | 'shop' | 'offers' | 'profile'

export type TaskFrequency = 'daily' | 'weekly'
export type TaskStatus = 'available' | 'completed' | 'claimed'
export type ShopCategory = 'food' | 'accessories' | 'style'
export type OfferStatus = 'active' | 'new' | 'locked'

export interface UserProfile {
  id: string
  name: string
  tier: string
  city: string
  coins: number
  streakDays: number
  experience: number
  tasksClaimed: number
  purchases: number
  memberSince: string
  inventory: string[]
  equippedItemIds: Partial<Record<ShopCategory, string>>
}

export interface CompanionProfile {
  id: string
  name: string
  role: string
  focus: string
  mood: string
  tagline: string
  nextMilestone: string
}

export interface Task {
  id: string
  title: string
  description: string
  frequency: TaskFrequency
  reward: number
  status: TaskStatus
  businessTag: string
}

export interface ShopItem {
  id: string
  name: string
  category: ShopCategory
  price: number
  description: string
  perk: string
  accent: string
  image?: string
}

export interface Offer {
  id: string
  title: string
  summary: string
  status: OfferStatus
  requirement: string
  reward: string
}
