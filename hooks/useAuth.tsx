import { AuthContext } from "@/context/AuthContext"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "react-toastify"
export default function useAuth() {
  const { auth, setAuth } = useContext(AuthContext)
  const isLoggedIn = !!auth?.username
  const router = useRouter()
  const logout = () => {
    axios
      .get(endpoints.logout)
      .then(() => {
        setAuth({})
        router.push("/")
        toast.success("Logout successfull.")
      })
      .catch(err => {
        setAuth({})
        router.push("/")
        if ([401, 403, 200].includes(err.response.status))
          toast.success("Logout successfull.")
      })
  }
  const getAccessToken = (): Promise<any> => {
    return axios
      .get(endpoints.getAccessToken)
      .then(res => {
        setAuth(res.data)
        return Promise.resolve(res)
      })
      .catch(err => {
        err.response.status !== 403 && logout()
        return Promise.reject(err)
      })
  }
  return {
    auth,
    setAuth,
    isLoggedIn,
    logout,
    getAccessToken
  }
}
