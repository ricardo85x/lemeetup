import axios, { AxiosResponse } from "axios"
import { setCookie } from "nookies";
import { useState, useEffect, useCallback } from "react"

interface IUseAuth {
  email: string
  password: string
}

interface IAuthenticateResponseProps {
  token: string;
  refresh_token: string;
}
export const useAuth = () => {


  const signIn = async ({ email, password }: IUseAuth): Promise<boolean> => {

    try {
      const response = await axios.post<IAuthenticateResponseProps>("http://localhost:3333/authenticate", {
        email, password
      })

      setCookie(undefined, 'nextAuth.token', response.data.token)
      setCookie(undefined, 'nextAuth.refresh_token', response.data.refresh_token)

      return true

    } catch (err: any) {
      console.log("Le error: ", err)
      if (err?.response?.status === 400) {
        console.error("Auth error: ", err?.response?.data?.message)
      } else {
        console.error("Internal server error")
      }
      setCookie(undefined, 'nextAuth.token', "")
      setCookie(undefined, 'nextAuth.refresh_token', "")

      return false
    }

  }

  const register = async ({ email, password }: IUseAuth) => {
    try {
      await axios.post("http://localhost:3333/users", {
        email, password
      })
      return true
    } catch (err: any) {
      console.log("Le error: ", err)
      if (err?.response?.status === 400) {
        console.error("Auth error: ", err?.response?.data?.message)
      } else {
        console.error("Internal server error")
      }
      return false
    }
  }

  return { signIn, register }

}