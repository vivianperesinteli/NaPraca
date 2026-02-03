import { useAuthStore } from '../stores/authStore'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { AuthViewModel } from '../viewmodels/AuthViewModel'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

interface HeaderProps {
  title: string
  showLogout?: boolean
}

export function Header({ title, showLogout = false }: HeaderProps) {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const authRepository = new AuthRepository()
    const authUseCase = new AuthUseCase(authRepository)
    const authViewModel = new AuthViewModel(authUseCase)
    
    await authViewModel.signOut()
    setUser(null)
    navigate('/auth')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        {showLogout && (
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  )
}

