import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  useMatch,
} from '@tanstack/react-location'

import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import FullProfilePage from './components/profile/FullProfilePage'
import axios from 'axios'
import ProfilePage from './pages/ProfilePage'
import People from './pages/People'

const queryClient = new QueryClient()

const location = new ReactLocation()

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <RegistrationPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/users/:id',
    element: <FullProfilePage />,
  },
  {
    path: '/users',
    element: <People />,
  },
]
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router routes={routes} location={location}>
        <Outlet />
      </Router>
    </QueryClientProvider>
  )
}

export default App
