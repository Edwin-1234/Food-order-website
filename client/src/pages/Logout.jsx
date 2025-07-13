import { useEffect } from 'react'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/auth/logout').then(() => {
      setUser(null)
      navigate('/')
    })
  }, [])

  return <p className="p-6">Logging out...</p>
}

export default Logout
