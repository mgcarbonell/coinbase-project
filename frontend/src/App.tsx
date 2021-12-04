import React, { FC, useState, useEffect, useRef } from "react"
import Navbar from "./components/Navbar"
import Grid from "@mui/material/Grid"
import IPairs from "./interfaces/ipairs.interface"
import ISocketFeed from "./interfaces/isocketfeed.interface"
import { formatData } from "./utils/formatData.util"
import "./styles/style.css"
// import ProductModel from "./models/product.model"
import axios, { AxiosResponse } from "axios"

const App: FC = () => {
  const [currencies, setCurrencies] = useState<any[]>([])
  const [pair, setPair] = useState<string>("")
  const [price, setprice] = useState<string>("0.00")
  const [pastData, setPastData] = useState({})

  const ws: any = useRef(null)
  let first = useRef(false)
  const url: string = `${process.env.REACT_APP_PRODUCT_API}`

  useEffect(() => {
    let productPairs: IPairs[] = []
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
    const apiCall = async () => {
      let response = await axios.get(url)
      const data = response.data
      productPairs = data
      let filtered = productPairs.filter((pair: any) => {
        if (pair.quote_currency === "USD") {
          return pair
        }
        return "No pair"
      })

      filtered = filtered.sort((a: IPairs, b: IPairs) => {
        if (a.base_currency < b.base_currency) {
          return -1
        }
        if (a.base_currency > b.base_currency) {
          return 1
        }
        return 0
      })

      setCurrencies(filtered)

      first.current = true
    }

    apiCall()
  }, [])

  useEffect(() => {
    if (!first.current) {
      return
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    }

    let jsonMsg: string = JSON.stringify(msg)
    ws.current.send(jsonMsg)

    let historicData: string = `${process.env.REACT_APP_PRODUCT_API}/${pair}/candles?granularity=86400`
    const fetchHistoricData = async () => {
      let dataArr: object[] = []
      const res: AxiosResponse = await axios(historicData)
      const data = await res.data
      dataArr = data
      let formattedData = formatData(dataArr)
      return setPastData(formattedData)
    }
    fetchHistoricData()
    ws.current.onmessage = (event: any) => {
      let data = JSON.parse(event.data)
      if (data.type !== "ticker") {
        return -1
      }
      if (data.product_id === pair) {
        setprice(data.price)
      }
    }
  }, [pair])

  const handleSelect = (e: any) => {
    let unsubMessage: ISocketFeed = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"],
    }

    let unsub = JSON.stringify(unsubMessage)

    ws.current.send(unsub)

    setPair(e.target.value)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        {
          <select name="currency" value={pair} onChange={handleSelect}>
            {currencies.map((cur, idx) => {
              return (
                <option key={idx} value={cur.id}>
                  {cur.display_name}
                </option>
              )
            })}
          </select>
        }
        <h1> {pair}</h1>
        <h2> {price} </h2>
      </div>
    </div>
  )
}

export default App
