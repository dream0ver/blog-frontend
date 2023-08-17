import axios from "axios"
const baseURL = "http://localhost:8080"
const axiosPublic = axios.create({
  baseURL
})
axiosPublic.defaults.withCredentials = true
export default axiosPublic
