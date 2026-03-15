import { OfferCard } from '../components/OfferCard'
import { PageHeader } from '../components/PageHeader'
import type { Offer } from '../types/app'

interface OffersPageProps {
  offers: Offer[]
}

export function OffersPage({ offers }: OffersPageProps) {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Привилегии"
        title="Привилегии для постоянных гостей"
        subtitle="Понятные привилегии для постоянных гостей: быстрее получать заказ, возвращаться по приятному поводу и видеть персональные предложения."
        meta={`${offers.length} доступно`}
      />
      <div className="space-y-2.5">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  )
}
