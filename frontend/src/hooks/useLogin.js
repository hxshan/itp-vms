import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from '@/api/axios'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await axios.post('/auth/login',{email,password})
    const json =  await response?.data

    console.log(response.status)
    if (!response.status==200) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.status ==200) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}