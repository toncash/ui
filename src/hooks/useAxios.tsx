import { useEffect, useState } from "react"
import axios from "axios"

export const useAxios = (url: string) => {
  const [data, setData] = useState([])
  const [error, setError] = useState<any>(null)
  console.log(error)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaded(true)
        const response = await axios(url)
        setData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoaded(false)
      }
    }
    fetchData()
  }, [url])

  return [data, error, loaded]
}
