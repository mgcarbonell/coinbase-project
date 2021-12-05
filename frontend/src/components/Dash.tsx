import React, { useState, useEffect } from "react"
import { Grid, Card, CardActions, CardContent, Typography } from "@mui/material"

interface Prop {
  details: {
    open?: string
    high?: string
    low?: string
    last?: string
    volume?: string
    volume_30day?: string
  }
}
const Dash: React.FC<Prop> = ({ details }) => {
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<object>({})

  useEffect(() => {
    console.log(`details from dash => `, details)
    // setName(pair.substring(pair.indexOf("-")))
    // setPrice(details)
  }, [details])

  if (!details) {
    return <h1>no details</h1>
  } else
    return (
      <div>
        <Card>
          <CardContent>
            <Grid xs={12}>
              <Grid item xs={4}>
                <Typography variant={"h2"}>
                  ${parseInt(details.last!).toFixed(2)}
                </Typography>
                <Typography variant={"h4"}>
                  {(
                    parseInt(details.high!) /
                    parseInt(details.low!) /
                    100
                  ).toFixed(6)}
                  % Change
                </Typography>
              </Grid>
              <Grid>
                {/* <Typography>{typeof parseInt(details.last)}</Typography> */}
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
}

export default Dash
