import React, { useState, useEffect } from "react"
import { Grid, Card, CardContent, Typography, Button } from "@mui/material"
import { Favorite } from "@mui/icons-material"
import FavoriteModel from "../models/favorites.model"

interface Prop {
  details: {
    open?: string
    high?: string
    low?: string
    last?: string
    volume?: string
    volume_30day?: string
  }
  title?: string
}
const Dash: React.FC<Prop> = ({ details, title }) => {
  const [favorite] = useState()
  // const [name, setName] = useState<string>("")
  // const [price, setPrice] = useState<object>({})

  const returnPercent = () => {
    let x = parseFloat(details.open!)
    let y = parseFloat(details.last!)
    let res = x / y
    return (
      <Typography
        variant={"h4"}
        style={{ color: `${y > x ? "green" : "red"}` }}
      >
        {y > x ? null : "-"}
        {res.toFixed(6)}%
      </Typography>
    )
  }

  useEffect(() => {
    console.log(`title from dash => `, title)
    // setName(pair.substring(pair.indexOf("-")))
    // setPrice(details)
  }, [title])

  const handleFavorite = (e: any) => {
    e.preventDefault()
    let cryptoName = title
    FavoriteModel.create({ cryptoName })
  }

  if (!details) {
    return <h1>no details</h1>
  } else
    return (
      <div>
        <Card>
          <CardContent>
            <Grid xs={12}>
              <Grid item xs={4}>
                <Typography component={"h2"} variant={"h2"}>
                  ${parseFloat(details.last!)}
                  {returnPercent()}
                </Typography>
                <Typography component={"p"} variant={"h4"}>
                  24h High: {details.high}
                </Typography>
                <Typography component={"p"} variant={"h4"}>
                  24h Low: {details.low}
                </Typography>
              </Grid>
              <Grid></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </CardContent>
          <Button onClick={handleFavorite}>
            <Favorite />
          </Button>
        </Card>
      </div>
    )
}

export default Dash
