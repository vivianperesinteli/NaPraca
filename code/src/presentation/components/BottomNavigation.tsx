import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Home, User, Users, Settings } from 'lucide-react'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'

export function BottomNavigation() {
  const location = useLocation()
  const [isEntrepreneur, setIsEntrepreneur] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkProfileType()
  }, [])

  const checkProfileType = async () => {
    try {
      const authRepository = new AuthRepository()
      const authUseCase = new AuthUseCase(authRepository)
      const profile = await authUseCase.getCurrentProfile()
      setIsEntrepreneur(profile?.profileType === 'entrepreneur')
    } catch (error) {
      console.error('Error checking profile type:', error)
    } finally {
      setLoading(false)
    }
  }

  const isActive = (path: string) => {
    if (path === '/business-management') {
      return location.pathname.startsWith('/business-management') || location.pathname.startsWith('/business/') && location.pathname.includes('/edit')
    }
    return location.pathname === path
  }

  if (loading) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <Link
          to="/map"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive('/map') ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs mt-1">Mapa</span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive('/dashboard') ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        {isEntrepreneur && (
          <Link
            to="/business-management"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/business-management') ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Gerenciar</span>
          </Link>
        )}
        <Link
          to="/creators"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive('/creators') ? 'text-primary-600' : 'text-gray-500'
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">Criadores</span>
        </Link>
      </div>
    </nav>
  )
}

