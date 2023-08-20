import axios from "axios"
export const baseURL = process.env.NEXT_PUBLIC_BE || "http://localhost:8080"
export default axios.create({
  baseURL,
  withCredentials: true
})
