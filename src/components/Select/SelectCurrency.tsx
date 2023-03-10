import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import { useAxios } from "../../hooks/useAxios"
import data from "../../config/currencies-parsed.json"
import {useEffect, useState} from "react"
import * as fs from "fs";
import Order from "../../models/order";
import {OrderUser} from "../../models/order-user";

type SelectCurrencyProps = {
    orderUser: OrderUser,
    setOrderUser: (o: OrderUser)=>void
}

const SelectCurrency = (props: SelectCurrencyProps) => {
    const {orderUser, setOrderUser} = props
  const [newValue, setNewValue] = useState(orderUser.order.currency)

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={newValue}
        disableClearable
        onChange={(event, newValue) => {
            setNewValue(newValue)
            orderUser.order.currency = newValue
            setOrderUser({...orderUser})
        }}
        options={data}
        renderInput={params => <TextField {...params} label={"Currency"} />}
      />
    </Grid>
  )
}

export default SelectCurrency
