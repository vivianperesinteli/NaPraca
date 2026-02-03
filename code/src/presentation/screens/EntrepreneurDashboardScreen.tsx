import { useState, useEffect } from 'react'
import { MissionRepository } from '@data/repositories/MissionRepository'
import { MissionUseCase } from '@domain/usecases/MissionUseCase'
import { MissionViewModel } from '../viewmodels/MissionViewModel'
import { Mission } from '@domain/entities/Mission'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { Header } from '../components/Header'
import { Trophy, Target, CheckCircle, Circle } from 'lucide-react'

export function EntrepreneurDashboardScreen() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profileId, setProfileId] = useState<string | null>(null)

  const missionRepository = new MissionRepository()
  const missionUseCase = new MissionUseCase(missionRepository)
  const missionViewModel = new MissionViewModel(missionUseCase)

  const authRepository = new AuthRepository()
  const authUseCase = new AuthUseCase(authRepository)

  useEffect(() => {
    loadUserAndMissions()
  }, [])

  const loadUserAndMissions = async () => {
    try {
      const currentProfileId = await authUseCase.getCurrentProfileId()
      if (currentProfileId) {
        setProfileId(currentProfileId)
        await loadMissions(currentProfileId)
      } else {
        setError('Perfil não encontrado. Faça login novamente.')
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados')
      setLoading(false)
    }
  }

  const loadMissions = async (entrepreneurProfileId: string) => {
    setLoading(true)
    setError('')
    try {
      const result = await missionViewModel.loadMissions(entrepreneurProfileId)
      if (result.success && result.data) {
        setMissions(result.data)
      } else {
        setError(result.error || 'Erro ao carregar missões')
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteMission = async (missionId: string) => {
    try {
      const result = await missionViewModel.completeMission(missionId)
      if (result.success && profileId) {
        await loadMissions(profileId)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao completar missão')
    }
  }

  const completedMissions = missions.filter((m) => m.isCompleted)
  const totalPoints = missions
    .filter((m) => m.isCompleted)
    .reduce((sum, m) => sum + m.points, 0)
  const completionRate =
    missions.length > 0 ? (completedMissions.length / missions.length) * 100 : 0

  const getMissionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      learning: 'Aprendizado',
      marketing: 'Marketing',
      sales: 'Vendas',
      management: 'Gestão',
    }
    return labels[type] || type
  }

  const getMissionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      learning: 'bg-blue-100 text-blue-700',
      marketing: 'bg-purple-100 text-purple-700',
      sales: 'bg-green-100 text-green-700',
      management: 'bg-orange-100 text-orange-700',
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Dashboard" showLogout />

      <div className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600">Pontos</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-gray-600">Taxa de Conclusão</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{Math.round(completionRate)}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-bold text-lg mb-4">Missões</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Carregando missões...</div>
          ) : missions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma missão disponível no momento
            </div>
          ) : (
            <div className="space-y-3">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`p-4 rounded-lg border-2 ${
                    mission.isCompleted
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {mission.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <h3 className="font-semibold text-gray-900">{mission.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getMissionTypeColor(
                            mission.missionType
                          )}`}
                        >
                          {getMissionTypeLabel(mission.missionType)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {mission.points} pontos
                        </span>
                      </div>
                    </div>
                  </div>
                  {!mission.isCompleted && (
                    <button
                      onClick={() => handleCompleteMission(mission.id)}
                      className="mt-2 w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      Marcar como Concluída
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

