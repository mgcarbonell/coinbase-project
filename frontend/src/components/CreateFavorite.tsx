import React from "react"
import { Button } from "@mui/material"
import { Favorite } from "@mui/icons-material"
// import FavoriteModel from "../models/favorites.model"

const CreateFavorite = () => {
  return (
    <div>
      <Button>
        <Favorite />
      </Button>
    </div>
  )
}

export default CreateFavorite
