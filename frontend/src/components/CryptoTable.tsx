import axios, { Method, AxiosResponse } from "axios"

const getCurrency = axios.create({
  baseURL: process.env.REACT_APP_CURRENCY_API,
})
