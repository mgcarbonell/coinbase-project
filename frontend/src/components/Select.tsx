import React, { useState, useEffect } from "react"
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { AnyRecord } from "dns"

interface Props {
  data: any[]
  title: string
  change: any
}
const Selector: React.FC<Props> = ({ title, data, change }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Coin</InputLabel>
        <Select label="Coin" onChange={(e) => change(e)}>
          {data.map((item, index) => (
            <MenuItem value={item.id} key={item.id + index}>
              {item.base_currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Selector
