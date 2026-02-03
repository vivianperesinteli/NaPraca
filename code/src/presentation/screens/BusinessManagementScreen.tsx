import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BusinessRepository } from '@data/repositories/BusinessRepository'
import { BusinessUseCase } from '@domain/usecases/BusinessUseCase'
import { BusinessViewModel } from '../viewmodels/BusinessViewModel'
import { Business } from '@domain/entities/Business'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { Header } from '../components/Header'
import { Edit, Trash2, Building2, MapPin, Phone, Mail, Plus } from 'lucide-react'

export function BusinessManagementScreen() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profileId, setProfileId] = useState<string | null>(null)
  const navigate = useNavigate()

  const businessRepository = new BusinessRepository()
  const businessUseCase = new BusinessUseCase(businessRepository)
  const businessViewModel = new BusinessViewModel(businessUseCase)

  const authRepository = new AuthRepository()
  const authUseCase = new AuthUseCase(authRepository)

  useEffect(() => {
    loadUserAndBusinesses()
  }, [])

  const loadUserAndBusinesses = async () => {
    try {
      const currentProfileId = await authUseCase.getCurrentProfileId()
      if (currentProfileId) {
        setProfileId(currentProfileId)
        await loadBusinesses(currentProfileId)
      } else {
        setError('Perfil não encontrado. Faça login novamente.')
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados')
      setLoading(false)
    }
  }

  const loadBusinesses = async (entrepreneurProfileId: string) => {
    setLoading(true)
    setError('')
    try {
      const result = await businessViewModel.loadBusinessesByEntrepreneur(entrepreneurProfileId)
      if (result.success && result.data) {
        setBusinesses(result.data)
      } else {
        setError(result.error || 'Erro ao carregar negócios')
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (businessId: string) => {
    navigate(`/business/${businessId}/edit`)
  }

  const handleDelete = async (businessId: string) => {
    if (!confirm('Tem certeza que deseja excluir este negócio? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      const result = await businessViewModel.deleteBusiness(businessId)
      if (result.success && profileId) {
        await loadBusinesses(profileId)
      } else {
        setError(result.error || 'Erro ao excluir negócio')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir negócio')
    }
  }

  const handleCreate = () => {
    navigate('/business/new')
  }


  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Gerenciar Negócios" showLogout />

      <div className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleCreate}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Novo Negócio
        </button>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Carregando negócios...</div>
        ) : businesses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Você ainda não possui negócios cadastrados.</p>
            <p className="text-sm text-gray-500">Use o botão acima para cadastrar seu primeiro negócio.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-primary-600" />
                      <h3 className="font-bold text-lg text-gray-900">{business.name}</h3>
                      {!business.isActive && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          Inativo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{business.description}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{business.address}</span>
                      </div>
                      {business.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{business.phone}</span>
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{business.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(business.id)}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(business.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
