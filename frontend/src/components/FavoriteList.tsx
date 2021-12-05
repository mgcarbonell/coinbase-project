import React, { useState, useEffect } from "react"
import { Grid, Paper, Divider, Typography, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import FavoriteModel from "../models/favorites.model"
// import { IFavorite } from "../interfaces/ifavorite.interface"
const FavoriteList = ({ favorites, setFavorites }) => {
  const [note, setNote] = useState<string>("")
  useEffect(() => {
    console.log(`favorites from favoritelist =>`, favorites)
  }, [favorites])

  const handleDelete = (e: any) => {
    // e.preventDefault()
    const id = parseInt(e.currentTarget.value, 10)
    console.log(`delete button clicked =>`, id)
    FavoriteModel.delete(id)
  }
  return (
    <div>
      <Typography component="h2" variant="h5">
        Favorited Coins
      </Typography>
      {favorites.map((item) => (
        <Grid container>
          <Grid item xs={2}>
            <Typography component="h3" key={item.id}>
              {item.cryptoName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography component="h3" key={item.id}>
              {item.note}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton value={item.id} key={item.id}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton value={item.id} key={item.id} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default FavoriteList
