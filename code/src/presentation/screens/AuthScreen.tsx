import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { AuthViewModel } from '../viewmodels/AuthViewModel'
import { useAuthStore } from '../stores/authStore'

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [profileType, setProfileType] = useState<'consumer' | 'entrepreneur'>('consumer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const authRepository = new AuthRepository()
  const authUseCase = new AuthUseCase(authRepository)
  const authViewModel = new AuthViewModel(authUseCase)

  useEffect(() => {
    const authRepository = new AuthRepository()
    const authUseCase = new AuthUseCase(authRepository)
    
    authUseCase.onAuthStateChange((user) => {
      setUser(user)
      if (user) {
        navigate('/map')
      }
    })
  }, [navigate, setUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const result = await authViewModel.signIn({ email, password })
        if (result.success && result.data?.user) {
          setUser(result.data.user)
          navigate('/map')
        } else {
          setError(result.error || 'Erro ao fazer login')
        }
      } else {
        if (!fullName.trim()) {
          setError('Nome completo é obrigatório')
          setLoading(false)
          return
        }
        const result = await authViewModel.signUp({
          email,
          password,
          fullName,
          profileType,
          phone: phone || undefined,
        })
        if (result.success && result.data?.user) {
          setUser(result.data.user)
          navigate('/map')
        } else {
          setError(result.error || 'Erro ao criar conta')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NaPraça</h1>
          <p className="text-gray-600">Escola de Negócios Gamificada</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              isLogin
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              !isLogin
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Perfil
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileType('consumer')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      profileType === 'consumer'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Consumidor
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileType('entrepreneur')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      profileType === 'entrepreneur'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Empreendedor
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone (opcional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

