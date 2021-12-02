import axios, { Method, AxiosResponse } from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_FAVORITE_API,
})

const request = <T>(
  method: Method,
  url: string,
  params: any
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
  })
}
