import axios, { AxiosError } from "axios"
import { parseCookies, setCookie } from "nookies"


let isRefreshing = false;
let failedRequestQueue: any[] = []

const setupClient = (ctx = undefined) => {

  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: "http://127.0.0.1:3333",
    headers: {
      Authorization: `Bearer ${cookies['nextAuth.token']}`
    }
  })



  api.interceptors.response.use(
    res => res,
    (err: AxiosError) => { // on error

      if (err.response?.status === 401) {
        if (err.response?.data?.code === "token.expired") {

          cookies = parseCookies(ctx)

          const {
            'nextAuth.refresh_token': refreshToken
          } = cookies


          // get axios original request so we can replace it
          const originalConfig = err.config

          // check if no other request is been made
          if (!isRefreshing) {
            // block the other requests
            isRefreshing = true

            api.post<{
              token: string,
              refresh_token: string
            }>("/refresh_token", {
              refresh_token: refreshToken
            }).then(response => {
              const { data } = response

              // update the cookies
              setCookie(ctx, 'nextAuth.token', data.token)
              setCookie(ctx, 'nextAuth.refresh_token', data.refresh_token)

              // update headers with the new token
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;


              // run all failed request with the new token
              failedRequestQueue.forEach(
                request => request.onSuccess(data.token)
              )

              // clear the failed request queue
              failedRequestQueue = []

            }).catch(err => {
              console.log("Ops, invalid refresh_token")

              // there is nothing to be done...
              failedRequestQueue.forEach(
                request => request.onFailure(err)
              )

              failedRequestQueue = []



            }).finally(() => {
              isRefreshing = false
            })

          }

          return new Promise((resolve, reject) => {

            failedRequestQueue.push({
              onSuccess: (token: string) => {

                if (originalConfig?.headers) {
                  // update request with new token
                  originalConfig.headers['Authorization'] = `Bearer ${token}`;
                }
                // call the same request with the updated token
                resolve(api(originalConfig))

              },
              onFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })

        }
      }

      return Promise.reject(err)
    }
  )

  return api
}


export const api = setupClient()