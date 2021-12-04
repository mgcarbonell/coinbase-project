import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
const Navbar = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CopperProp
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
