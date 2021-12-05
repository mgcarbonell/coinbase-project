import React, { FC, useState, useEffect, useRef } from "react"
import Navbar from "./components/Navbar"
import Grid from "@mui/material/Grid"
import IPairs from "./interfaces/ipairs.interface"
import ISocketFeed from "./interfaces/isocketfeed.interface"
import "./styles/style.css"
import Selector from "./components/Select"
import Dash from "./components/Dash"
import FavoriteList from "./components/FavoriteList"
import axios, { AxiosResponse } from "axios"
import PropTypes from "prop-types"
import FavoriteModel from "./models/favorites.model"

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<any[]>([]) // holds our currencies objects
  const [pair, setPair] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const [price, setprice] = useState<string>("0.00")
  const [name, setName] = useState<string>("")
  const [productDetails, setProductDetails] = useState<object>({})
  const [favorites, setFavorites] = useState<
    Array<{
      id: string
      cryptoName: string
      note: string
    }>
  >([])

  const url: string = `${process.env.REACT_APP_PRODUCT_API}`

  useEffect(() => {
    let pairs: IPairs[] = []
    const apiCall = async () => {
      let response = await axios.get(url)
      const data = response.data
      pairs = data
      let filtered = pairs.filter((pair: any) => {
        if (pair.quote_currency === "USD") {
          return pair
        }
        return 0
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
      let filteredCurrency = filtered.map((cur) => cur)
      setCurrencies(filteredCurrency)
    }

    const favoritesCall = async () => {
      FavoriteModel.all().then((data) => {
        data.forEach((elem) => {
          console.log(elem.cryptoName)
          setName(elem.cryptoName)
        })
        setFavorites(data)
      })
    }
    apiCall()
    favoritesCall()
  }, [])

  const makeCoinCall = async (e: any) => {
    e.preventDefault()
    const response = await axios.get(
      `${process.env.REACT_APP_PRODUCT_API}/${
        e.target.value === null ? "BTC-USD" : e.target.value
      }/stats`
    )
    const data = await response.data

    setProductDetails(data)
    setValue(e.target.value)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <Selector
          data={currencies}
          title={pair}
          change={makeCoinCall}
        ></Selector>
        <Grid>
          {Object.keys(productDetails).length > 0 ? (
            <>
              <Dash details={productDetails} />
            </>
          ) : (
            <h1>No Details</h1>
          )}
        </Grid>
        <Grid>
          {favorites.length > 0 ? (
            <>
              <FavoriteList favorites={favorites} />
            </>
          ) : (
            <p>You should like some cryptos.</p>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default App
