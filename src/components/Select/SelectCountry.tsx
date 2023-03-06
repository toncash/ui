import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import { useAxios } from "../../hooks/useAxios"
import data from "../../config/currencies.json"
import { useState } from "react"

const SelectCountry = (props: any) => {
  const { value, label } = props
  const [newValue, setNewValue] = useState("")

  console.log(data)
  const dataParsed = data
    .sort((a, b) => a.population - b.population)
    .map((item: any) => {
      try {
        const code = Object.keys(item.currencies)[0]
        const symbol = item.currencies[code].symbol
        if (symbol == undefined) {
          return
        }
        return `${symbol} ${code}`
      } catch (e) {
        return
      }
    })

  const dataFilter = dataParsed.filter((value, index, array) => value !== undefined && array.indexOf(value) === index)
  console.log(dataFilter)

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setNewValue(newValue)
        }}
        options={dataFilter}
        renderInput={params => <TextField {...params} label={label} />}
      />
    </Grid>
  )
}

export default SelectCountry
