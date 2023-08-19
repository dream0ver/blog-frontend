import axios from "@/util/axios"
import { useEffect } from "react"
import useAuth from "./useAuth"
export default function useAxiosPrivate() {
  const { auth, getAccessToken } = useAuth()
  useEffect(() => {
    const request = axios.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.access_token}`
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    const response = axios.interceptors.response.use(
      response => response,
      async error => {
        try {
          const prevRequest = error?.config
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true
            const data = await getAccessToken()
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${data.data.access_token}`
            return axios(prevRequest)
          }
        } catch (err) {
          Promise.reject(err)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axios.interceptors.request.eject(request)
      axios.interceptors.response.eject(response)
    }
  }, [auth, getAccessToken])

  return axios
}
