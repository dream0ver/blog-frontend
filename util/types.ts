export type ButtonPropType = {
  label: string
  buttonClass?: string
  onClick?: () => void
}
export type PostCardPropType = {
  id: number
  user_id: number
  title: string
  body: string
  image: string
  category: string
}

export type AuthContextType = {
  auth: {
    username?: string
    access_token?: string
    id?: number
    roles?: number[]
  }
  setAuth: (data: object) => void
}
