// src/context/NonceContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'

type NonceContextType = {
  nonce: string
  refreshNonce: () => void
}

const NonceContext = createContext<NonceContextType | undefined>(undefined)

export const NonceProvider: React.FC<{
  children: React.ReactNode
  initialNonce?: string
}> = ({ children, initialNonce }) => {
  const [nonce, setNonce] = useState(initialNonce || crypto.randomUUID())

  // Refresh nonce every hour for added security
  useEffect(() => {
    const interval = setInterval(() => {
      setNonce(crypto.randomUUID())
    }, 3600000)
    return () => clearInterval(interval)
  }, [])

  const refreshNonce = () => {
    setNonce(crypto.randomUUID())
  }

  return (
    <NonceContext.Provider value={{ nonce, refreshNonce }}>
      {children}
    </NonceContext.Provider>
  )
}

// Hook with additional validation
export const useNonce = () => {
  const context = useContext(NonceContext)
  if (context === undefined) {
    throw new Error('useNonce must be used within a NonceProvider')
  }
  
  // Validate nonce format (basic check)
  if (!/^[a-zA-Z0-9_-]{20,}$/.test(context.nonce)) {
    throw new Error('Invalid nonce format')
  }

  return context
}