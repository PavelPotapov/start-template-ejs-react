import React from 'react'
import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

// Компонент-поставщик данных
export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('pavel')

  const login = user => {
    setCurrentUser(user)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AppContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AppContext.Provider>
  )
}

// Компонент-потребитель данных
export const useAppContext = () => {
  return useContext(AppContext)
}
