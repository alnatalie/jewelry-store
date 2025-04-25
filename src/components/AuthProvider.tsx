'use client'
import { ReactNode, useEffect } from 'react'
import { remult } from 'remult'

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleRouteChange = async () => {
      await remult.initUser()
    }
    
    // Проверяем аутентификацию при изменении маршрута
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return <>{children}</>
}