import React from "react"
import { InputLabel, MenuItem, FormControl } from "@mui/material"
import Select from "@mui/material/Select"

interface Props {
  data: any[]
  title: string
  change: any
}
const Selector: React.FC<Props> = ({ title, data, change }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
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
