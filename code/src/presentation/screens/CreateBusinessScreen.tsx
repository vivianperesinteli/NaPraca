import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BusinessRepository } from '@data/repositories/BusinessRepository'
import { BusinessUseCase } from '@domain/usecases/BusinessUseCase'
import { BusinessViewModel } from '../viewmodels/BusinessViewModel'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { Header } from '../components/Header'
import { ArrowLeft, Save } from 'lucide-react'

export function CreateBusinessScreen() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Form fields
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [address, setAddress] = useState('')

  const categories = [
    'Alimentação',
    'Varejo',
    'Serviços',
    'Beleza',
    'Tecnologia',
    'Saúde',
    'Educação',
  ]
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')

  const businessRepository = new BusinessRepository()
  const businessUseCase = new BusinessUseCase(businessRepository)
  const businessViewModel = new BusinessViewModel(businessUseCase)

  const authRepository = new AuthRepository()
  const authUseCase = new AuthUseCase(authRepository)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSaving(true)
    setError('')

    try {
      // Validação e formatação de latitude
      const latStr = latitude.trim().replace(',', '.')
      const lat = parseFloat(latStr)

      if (isNaN(lat)) {
        setError('Latitude deve ser um número válido')
        setSaving(false)
        return
      }

      if (lat < -90 || lat > 90) {
        setError('Latitude deve estar entre -90 e 90 graus')
        setSaving(false)
        return
      }

      // Limitar a 8 casas decimais (conforme DECIMAL(10, 8))
      const formattedLat = parseFloat(lat.toFixed(8))

      // Validação e formatação de longitude
      const lngStr = longitude.trim().replace(',', '.')
      const lng = parseFloat(lngStr)

      if (isNaN(lng)) {
        setError('Longitude deve ser um número válido')
        setSaving(false)
        return
      }

      if (lng < -180 || lng > 180) {
        setError('Longitude deve estar entre -180 e 180 graus')
        setSaving(false)
        return
      }

      // Limitar a 8 casas decimais (conforme DECIMAL(11, 8))
      const formattedLng = parseFloat(lng.toFixed(8))

      const profileId = await authUseCase.getCurrentProfileId()
      if (!profileId) {
        setError('Perfil não encontrado. Faça login novamente.')
        setSaving(false)
        return
      }

      // Validar que pelo menos uma categoria foi selecionada
      if (selectedCategories.length === 0) {
        setError('Selecione pelo menos uma categoria')
        setSaving(false)
        return
      }

      // Validar que não foram selecionadas mais de 3 categorias
      if (selectedCategories.length > 3) {
        setError('Selecione no máximo 3 categorias')
        setSaving(false)
        return
      }

      const businessData: any = {
        name: name.trim(),
        description: description.trim(),
        category: selectedCategories.join(', '),
        address: address.trim(),
        latitude: formattedLat,
        longitude: formattedLng,
      }

      if (phone.trim()) businessData.phone = phone.trim()
      if (whatsapp.trim()) businessData.whatsapp = whatsapp.trim()
      if (email.trim()) businessData.email = email.trim()
      if (website.trim()) businessData.website = website.trim()

      const result = await businessViewModel.createBusiness(profileId, businessData)
      if (result.success) {
        navigate('/business-management')
      } else {
        setError(result.error || 'Erro ao criar negócio')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Cadastrar Negócio" />

      <div className="p-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Negócio *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categorias * (selecione até 3)
            </label>
            <div className="space-y-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (selectedCategories.length < 3) {
                          setSelectedCategories([...selectedCategories, cat])
                        } else {
                          setError('Você pode selecionar no máximo 3 categorias')
                        }
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                        setError('')
                      }
                    }}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    disabled={!selectedCategories.includes(cat) && selectedCategories.length >= 3}
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {selectedCategories.length > 0
                ? `Selecionadas: ${selectedCategories.length}/3 - ${selectedCategories.join(', ')}`
                : 'Nenhuma categoria selecionada'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude * (-90 a 90)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={latitude}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.,-]/g, '')
                  setLatitude(value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: -23.5505"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Formato: -90.00000000 a 90.00000000</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude * (-180 a 180)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={longitude}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.,-]/g, '')
                  setLongitude(value)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: -46.6333"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Formato: -180.00000000 a 180.00000000</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            <p className="font-medium mb-1">💡 Dica:</p>
            <p>Você pode obter as coordenadas usando o Google Maps. Clique com o botão direito no local e copie as coordenadas. Use ponto (.) ou vírgula (,) como separador decimal.</p>
            <p className="mt-2 text-xs">Exemplos válidos: -23.5505, -23,5505, -46.6333</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="(00) 0000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="contato@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://www.exemplo.com"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => navigate('/business-management')}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
