import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { BusinessRepository } from '@data/repositories/BusinessRepository'
import { BusinessUseCase } from '@domain/usecases/BusinessUseCase'
import { BusinessViewModel } from '../viewmodels/BusinessViewModel'
import { Business } from '@domain/entities/Business'
import { Header } from '../components/Header'
import { BusinessCard } from '../components/BusinessCard'
import { Search, Filter, X } from 'lucide-react'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const defaultCenter = {
  lat: -23.5505,
  lng: -46.6333,
}

const categories = [
  'Todos',
  'Alimentação',
  'Varejo',
  'Serviços',
  'Beleza',
  'Tecnologia',
  'Saúde',
  'Educação',
]

export function MapScreen() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [, setLoading] = useState(true)
  const [, setError] = useState('')

  const navigate = useNavigate()
  const mapRef = useRef<google.maps.Map | null>(null)

  const businessRepository = new BusinessRepository()
  const businessUseCase = new BusinessUseCase(businessRepository)
  const businessViewModel = new BusinessViewModel(businessUseCase)

  useEffect(() => {
    loadBusinesses()
  }, [])

  useEffect(() => {
    filterBusinesses()
  }, [searchQuery, selectedCategory, businesses])

  const loadBusinesses = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await businessViewModel.loadAllBusinesses()
      if (result.success && result.data) {
        setBusinesses(result.data)
        setFilteredBusinesses(result.data)
      } else {
        setError(result.error || 'Erro ao carregar negócios')
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const filterBusinesses = async () => {
    if (searchQuery.trim() || selectedCategory !== 'Todos') {
      const result = await businessViewModel.searchBusinesses(
        searchQuery,
        selectedCategory !== 'Todos' ? selectedCategory : undefined
      )
      if (result.success && result.data) {
        setFilteredBusinesses(result.data)
      }
    } else {
      setFilteredBusinesses(businesses)
    }
  }

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setMapCenter(userLocation)
          map.setCenter(userLocation)
        },
        () => {
          // Se falhar, usa o centro padrão
        }
      )
    }
  }, [])

  const handleMarkerClick = (business: Business) => {
    setSelectedBusiness(business)
  }

  const handleBusinessClick = (business: Business) => {
    navigate(`/business/${business.id}`)
  }

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!googleMapsApiKey) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 mb-2">Google Maps API Key não configurada</p>
          <p className="text-sm text-gray-600">
            Configure a variável VITE_GOOGLE_MAPS_API_KEY no arquivo .env
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <Header title="NaPraça" showLogout />
      <div className="flex-1 relative">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={13}
            onLoad={onMapLoad}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
            }}
          >
            {filteredBusinesses
              .filter((business) => business.isActive)
              .map((business) => (
                <Marker
                  key={business.id}
                  position={{ lat: business.latitude, lng: business.longitude }}
                  onClick={() => handleMarkerClick(business)}
                  icon={{
                    url: business.isActive
                      ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                      : 'http://maps.google.com/mapfiles/ms/icons/gray-dot.png',
                    scaledSize: new google.maps.Size(40, 40),
                  }}
                  title={business.name}
                />
              ))}

            {selectedBusiness && (
              <InfoWindow
                position={{
                  lat: selectedBusiness.latitude,
                  lng: selectedBusiness.longitude,
                }}
                onCloseClick={() => setSelectedBusiness(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold text-sm mb-1">{selectedBusiness.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedBusiness.category.split(/,\s*/).map((cat: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleBusinessClick(selectedBusiness)}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Ver detalhes →
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>

        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar negócios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-2 bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Categorias</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setShowFilters(false)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedBusiness && (
          <div className="absolute bottom-20 left-4 right-4 z-10">
            <BusinessCard
              business={selectedBusiness}
              onClick={() => handleBusinessClick(selectedBusiness)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

