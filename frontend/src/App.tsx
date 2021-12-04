import React, { FC, useState, useEffect, useRef } from "react"
import Grid from "@mui/material/Grid"
import IPairs from "./interfaces/IPairs"
import ISocketFeed from "./interfaces/ISocketFeed"
import { formatData } from "./utils/formatData.util"

import axios, { AxiosResponse } from "axios"

const App: FC = () => {
  const [currencies, setCurrencies] = useState([])
  const [pair, setPair] = useState("")
  const [price, setprice] = useState("0.00")
  const [pastData, setPastData] = useState({})

  const ws: any = useRef(null)
  let first = useRef(false)
  const url: string = `${process.env.REACT_APP_PRODUCT_API}`

  useEffect(() => {
    // const url: string = `${process.env.REACT_APP_CURRENCY_API}`
    let pairs: IPairs
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
    const apiCall = async () => {
      await fetch(url)
        .then((res: Response) => res.json())
        .then((data: any) => (pairs = data))
      let filtered = pairs.filter((pair: any) => {
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

    let msg: ISocketFeed = {
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

  const handleSelect = (e) => {
    let unsubMessage: ISocketFeed = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"],
    }

    let unsub = JSON.stringify(unsubMesssage)

    ws.current.send(unsub)

    setPair(e.target.value)
  }

  return (
    <div>
      <Grid></Grid>
    </div>
  )
}

export default App
