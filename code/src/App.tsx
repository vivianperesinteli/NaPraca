import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthScreen } from '@presentation/screens/AuthScreen'
import { MapScreen } from '@presentation/screens/MapScreen'
import { BusinessProfileScreen } from '@presentation/screens/BusinessProfileScreen'
import { EntrepreneurDashboardScreen } from '@presentation/screens/EntrepreneurDashboardScreen'
import { CreatorsScreen } from '@presentation/screens/CreatorsScreen'
import { BusinessManagementScreen } from '@presentation/screens/BusinessManagementScreen'
import { EditBusinessScreen } from '@presentation/screens/EditBusinessScreen'
import { CreateBusinessScreen } from '@presentation/screens/CreateBusinessScreen'
import { BottomNavigation } from '@presentation/components/BottomNavigation'
import { useAuthStore } from '@presentation/stores/authStore'
import { AuthRepository } from '@data/repositories/AuthRepository'
import { AuthUseCase } from '@domain/usecases/AuthUseCase'
import { supabase } from '@data/services/supabaseClient'

function App() {
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    const authRepository = new AuthRepository()
    const authUseCase = new AuthUseCase(authRepository)
    
    // Verificar usuário atual
    authUseCase.getCurrentUser().then((currentUser) => {
      setUser(currentUser)
    }).catch((error) => {
      console.error('Error getting current user:', error)
    })

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser])

  return (
    <Router>
      <div className="mobile-container">
        <Routes>
          <Route 
            path="/auth" 
            element={user ? <Navigate to="/map" replace /> : <AuthScreen />} 
          />
          <Route 
            path="/map" 
            element={user ? <MapScreen /> : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/business/:id" 
            element={user ? <BusinessProfileScreen /> : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <EntrepreneurDashboardScreen /> : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/business-management" 
            element={user ? <BusinessManagementScreen /> : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/business/:id/edit" 
            element={user ? <EditBusinessScreen /> : <Navigate to="/auth" replace />} 
          />
          <Route 
            path="/business/new" 
            element={user ? <CreateBusinessScreen /> : <Navigate to="/auth" replace />} 
          />
          <Route path="/creators" element={<CreatorsScreen />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
        {user && <BottomNavigation />}
      </div>
    </Router>
  )
}

export default App

