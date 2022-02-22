import axios, { AxiosResponse } from "axios"
import { useState, useEffect, useCallback } from "react"

interface IUseAuth {
  email: string
  password: string
}

export const useAuth = () => {

  const [token, setToken] = useState<string>("")
  const [hasError, setHasError] = useState<boolean>(false)

  const signIn = async ({ email, password }: IUseAuth) => {
    const response = await Promise.all([axios
      .post("http://localhost:3333/authenticate", {
        email, password
      }
      ).then(response => {
        setToken(response.data)
        setHasError(false)
      }).catch(err => {
        if (err?.response?.status === 400) {
          console.error("Auth error: ", err?.response?.data?.message)
        } else {
          console.error("Internal server error")
        }
        setHasError(true)
      })])

    return hasError
  }

  const register = async ({ email, password }: IUseAuth) => {
    await Promise.all([axios
      .post("http://localhost:3333/users", {
        email, password
      }
      ).then(response => {
        console.log("User registration successful")
        setHasError(false)
      }).catch(err => {
        if (err?.response?.status === 400) {
          console.error("Auth error: ", err?.response?.data?.message)
        } else {
          console.error("Internal server error")
        }
        setHasError(true)

      })])
  }

  return { token, signIn, register, hasError }

}