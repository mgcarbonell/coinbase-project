import React, { FC, useState, useEffect, useRef } from "react"
import Navbar from "./components/Navbar"
import Grid from "@mui/material/Grid"
import IPairs from "./interfaces/ipairs.interface"
import ISocketFeed from "./interfaces/isocketfeed.interface"
// import IDetails from "./interfaces/idetails.interface"
import { formatData } from "./utils/formatData.util"
import "./styles/style.css"
import Selector from "./components/Select"
import Dash from "./components/Dash"
// import ProductModel from "./models/product.model"
import axios, { AxiosResponse } from "axios"
import PropTypes from "prop-types"

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<any[]>([]) // holds our currencies objects
  const [pair, setPair] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const [price, setprice] = useState<string>("0.00")
  const [productDetails, setProductDetails] = useState<object>({})
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
      // console.log(`filteredCurrency`, filteredCurrency)
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

  const makeCall = async (e: any) => {
    e.preventDefault()
    // console.log(`e from app => `, e.target.value)
    const response = await axios.get(
      `${process.env.REACT_APP_PRODUCT_API}/${
        e.target.value === null ? "BTC-USD" : e.target.value
      }/stats`
    )
    const data = await response.data
    // let toState: IDetails = {
    //   high: data.high,
    //   last: data.last,
    //   low: data.low,
    //   open: data.open,
    //   volume: data.volume,
    //   volume_30day: data.volume_30day,
    // }
    console.log(`data from app => `, typeof data, data)

    setProductDetails(data)
    setValue(e.target.value)
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <Selector data={currencies} title={"left"} change={makeCall}></Selector>
        {Object.keys(productDetails).length > 0 ? (
          <Dash details={productDetails} />
        ) : (
          <h1>No Details</h1>
        )}
      </div>
    </div>
  )
}

export default App
