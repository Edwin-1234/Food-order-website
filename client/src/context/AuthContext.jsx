import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../utils/axiosInstance'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Load user info on refresh
  useEffect(() => {
    axios.get('/auth/profile')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
