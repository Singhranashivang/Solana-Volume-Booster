import { lazy, Suspense } from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load route components
const Index = lazy(() => import('./pages/Index'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Routes = ({ nonce }: { nonce?: string }) => {
  return (
    <Suspense fallback={<LoadingSpinner nonce={nonce} />}>
      <RouterRoutes>
        <Route path="/" element={<Index nonce={nonce} />} />
        <Route path="*" element={<NotFound nonce={nonce} />} />
      </RouterRoutes>
    </Suspense>
  )
}

export default Routes