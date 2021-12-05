import axios, { AxiosResponse } from "axios"
import { Request, Response, NextFunction } from "express"

const getCurrencyData = async (req: Request, res: Response) => {
  try {
    const { product } = req.body
    const api: string = `https://api.pro.coinbase.com/products/${product}/stats`
    const response: AxiosResponse = await axios.get(api)
    let queryObj = await res.json(response.data)
    return queryObj
  } catch (error) {
    return res.json({ error })
  }
}

const getProductData = async (req: Request, res: Response) => {
  try {
    const api: string = "https://api.pro.coinbase.com/products/"
    const response: AxiosResponse = await axios.get(api)
    let queryObj: Response = await res.json(response.data)
    return queryObj
  } catch (error) {
    return res.json({ error })
  }
}

const calculate24Difference = async (req: Request, res: Response) => {}

export { getCurrencyData, getProductData }
