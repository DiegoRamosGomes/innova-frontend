import { useState, useEffect } from 'react'
import api from "../services/api";

interface FetchState<T> {
  data: T | null
  error: any
  isLoading: boolean
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await api.get<T>(url)
        setData(response.data.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData().then()
  }, [url])

  return { data, error, isLoading }
}

export default useFetch
