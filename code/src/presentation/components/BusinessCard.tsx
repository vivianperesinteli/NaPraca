import { Business } from '@domain/entities/Business'
import { MapPin, Phone, MessageCircle } from 'lucide-react'

interface BusinessCardProps {
  business: Business
  onClick?: () => void
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (business.whatsapp) {
      window.open(`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`, '_blank')
    }
  }

  const handlePhone = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (business.phone) {
      window.open(`tel:${business.phone}`, '_blank')
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 mb-3 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-3">
        {business.logoUrl ? (
          <img
            src={business.logoUrl}
            alt={business.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-600">
              {business.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{business.name}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{business.description}</p>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{business.address}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {business.category.split(/,\s*/).map((cat: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {cat.trim()}
              </span>
            ))}
            {business.whatsapp && (
              <button
                onClick={handleWhatsApp}
                className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
            {business.phone && (
              <button
                onClick={handlePhone}
                className="p-1.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                aria-label="Telefone"
              >
                <Phone className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

