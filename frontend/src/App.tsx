import React, { FC, useState, useEffect, useRef } from "react"
import Navbar from "./components/Navbar"
import Grid from "@mui/material/Grid"
import IPairs from "./interfaces/ipairs.interface"
import ISocketFeed from "./interfaces/isocketfeed.interface"
import { formatData } from "./utils/formatData.util"
import "./styles/style.css"
import Selector from "./components/Select"
import Dash from "./components/Dash"
// import ProductModel from "./models/product.model"
import axios, { AxiosResponse } from "axios"

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<any[]>([]) // holds our currencies objects
  const [pair, setPair] = useState<string>("")
  const [price, setprice] = useState<string>("0.00")
  const [pastData, setPastData] = useState({})

  const ws: any = useRef(null)
  let first = useRef(false)
  const url: string = `${process.env.REACT_APP_PRODUCT_API}`

  useEffect(() => {
    let pairs: IPairs[] = []
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
    const apiCall = async () => {
      let response = await axios.get(url)
      const data = response.data
      // console.log(`data`, data)
      pairs = data
      let filtered = pairs.filter((pair: any) => {
        if (pair.quote_currency === "USD") {
          return pair
        }
        return 0
      })
      // console.log(filtered)
      filtered = filtered.sort((a: IPairs, b: IPairs) => {
        if (a.base_currency < b.base_currency) {
          return -1
        }
        if (a.base_currency > b.base_currency) {
          return 1
        }
        return 0
      })
      // map through filtered and set the state to filtered(i).base_currency
      let filteredCurrency = filtered.map((cur) => cur)
      console.log(`filteredCurrency`, filteredCurrency)
      setCurrencies(filteredCurrency)

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
      // console.log(data)
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
        <Selector
          data={currencies}
          title={"left"}
          change={handleSelect}
        ></Selector>

        <h1> {pair}</h1>
        <h2> {price} </h2>
      </div>
    </div>
  )
}

export default App
