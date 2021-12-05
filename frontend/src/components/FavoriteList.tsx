import React, { useEffect } from "react"
import { Grid, Paper, Divider, Typography } from "@mui/material"
// import { IFavorite } from "../interfaces/ifavorite.interface"
const FavoriteList = ({ favorites }) => {
  useEffect(() => {
    console.log(`favorites from favoritelist =>`, favorites)
  }, [favorites])

  return (
    <div>
      <Typography component="h2" variant="h5">
        Favorited Coins
      </Typography>
      {favorites.map((item) => (
        <Grid>
          <Typography component="h3" key={item.id}>
            {item.cryptoName}
          </Typography>
        </Grid>
      ))}
    </div>
  )
}

export default FavoriteList
