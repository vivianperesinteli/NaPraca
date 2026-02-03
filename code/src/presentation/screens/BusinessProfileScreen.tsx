import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BusinessRepository } from '@data/repositories/BusinessRepository'
import { BusinessUseCase } from '@domain/usecases/BusinessUseCase'
import { BusinessViewModel } from '../viewmodels/BusinessViewModel'
import { Business } from '@domain/entities/Business'
import { Header } from '../components/Header'
import { ArrowLeft, Phone, MessageCircle, Mail, Globe, MapPin } from 'lucide-react'

export function BusinessProfileScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const businessRepository = new BusinessRepository()
  const businessUseCase = new BusinessUseCase(businessRepository)
  const businessViewModel = new BusinessViewModel(businessUseCase)

  useEffect(() => {
    if (id) {
      loadBusiness()
    }
  }, [id])

  const loadBusiness = async () => {
    if (!id) return
    setLoading(true)
    setError('')
    try {
      const result = await businessViewModel.loadBusinessById(id)
      if (result.success && result.data) {
        setBusiness(result.data)
      } else {
        setError(result.error || 'Negócio não encontrado')
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    if (business?.whatsapp) {
      window.open(`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`, '_blank')
    }
  }

  const handlePhone = () => {
    if (business?.phone) {
      window.open(`tel:${business.phone}`, '_blank')
    }
  }

  const handleEmail = () => {
    if (business?.email) {
      window.open(`mailto:${business.email}`, '_blank')
    }
  }

  const handleWebsite = () => {
    if (business?.website) {
      window.open(business.website, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Carregando..." />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando informações...</div>
        </div>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Erro" />
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Negócio não encontrado'}
          </div>
          <button
            onClick={() => navigate('/map')}
            className="mt-4 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Voltar ao Mapa
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={business.name} />
      
      {business.coverImageUrl && (
        <div className="w-full h-48 bg-gray-200">
          <img
            src={business.coverImageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-start gap-4 mb-4">
            {business.logoUrl ? (
              <img
                src={business.logoUrl}
                alt={business.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-primary-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-600">
                  {business.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{business.name}</h1>
              <div className="flex flex-wrap gap-2">
                {business.category.split(/,\s*/).map((cat: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                  >
                    {cat.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{business.description}</p>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{business.address}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-bold text-lg mb-4">Contato</h2>
          <div className="space-y-3">
            {business.phone && (
              <button
                onClick={handlePhone}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary-600" />
                <span className="flex-1 text-left">{business.phone}</span>
              </button>
            )}
            {business.whatsapp && (
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="flex-1 text-left">WhatsApp: {business.whatsapp}</span>
              </button>
            )}
            {business.email && (
              <button
                onClick={handleEmail}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary-600" />
                <span className="flex-1 text-left">{business.email}</span>
              </button>
            )}
            {business.website && (
              <button
                onClick={handleWebsite}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5 text-primary-600" />
                <span className="flex-1 text-left">{business.website}</span>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate('/map')}
          className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar ao Mapa</span>
        </button>
      </div>
    </div>
  )
}

