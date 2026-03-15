import { PageHeader } from '../components/PageHeader'
import { SectionCard } from '../components/SectionCard'
import { ShopItemCard } from '../components/ShopItemCard'
import type { ShopCategory, ShopItem, UserProfile } from '../types/app'
import { formatCoins, formatShopCategory } from '../utils/format'

interface ShopPageProps {
  user: UserProfile
  items: ShopItem[]
  onBuyItem: (itemId: string) => void
  onEquipItem: (itemId: string) => void
}

const categories: ShopCategory[] = ['food', 'accessories', 'style']

export function ShopPage({ user, items, onBuyItem, onEquipItem }: ShopPageProps) {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Каталог наград"
        title="Каталог наград"
        subtitle="Баллы превращаются в понятные награды: кофе, десерты, бонусы к заказу и фирменный мерч кофейни."
        meta={`${formatCoins(user.coins)} баллов`}
      />

      {categories.map((category) => {
        const categoryItems = items.filter((item) => item.category === category)
        return (
          <SectionCard
            key={category}
            title={formatShopCategory(category)}
            subtitle={
              category === 'food'
                ? 'Самые быстрые награды, которые удобно забрать при следующем визите'
                : category === 'accessories'
                  ? 'Мягкие стимулы, которые возвращают гостя за новым заказом'
                  : 'Фирменные награды для тех, кто уже чувствует связь с брендом'
            }
            className={
              category === 'food'
                ? 'border-[#ecd7c4] bg-[linear-gradient(180deg,#fff8f2,#f7eee3)]'
                : category === 'accessories'
                  ? 'border-[#e9ddcf] bg-[linear-gradient(180deg,#fcf5ee,#f3e8dc)]'
                  : 'border-[#e6dbd2] bg-[linear-gradient(180deg,#f7f1eb,#eee4d8)]'
            }
          >
            <div className="space-y-2.5">
              {categoryItems.map((item) => {
                const owned = user.inventory.includes(item.id)
                const equipped = user.equippedItemIds[item.category] === item.id
                return (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    owned={owned}
                    equipped={equipped}
                    canAfford={user.coins >= item.price}
                    onBuy={() => onBuyItem(item.id)}
                    onEquip={() => onEquipItem(item.id)}
                  />
                )
              })}
            </div>
          </SectionCard>
        )
      })}
    </div>
  )
}
