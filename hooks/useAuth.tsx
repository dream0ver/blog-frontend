import { AuthContext } from "@/context/AuthContext"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "react-toastify"
export default function useAuth() {
  const { auth, setAuth } = useContext(AuthContext)

  const isLoggedIn = Object.keys(auth).length

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
        if ([401, 403, 200].includes(err.response.status)) {
          toast.success("Logout successfull.")
        }
      })
  }

  const getAccessToken = () => {
    return axios
      .get(endpoints.getAccessToken)
      .then(res => setAuth(res.data))
      .catch(err => logout())
  }

  return {
    auth,
    setAuth,
    isLoggedIn,
    logout: () => logout(),
    getAccessToken: () => getAccessToken()
  }
}
