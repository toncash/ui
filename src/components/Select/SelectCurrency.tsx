import { Autocomplete, TextField } from "@mui/material"
import data from "../../config/currencies-parsed.json"
import { useEffect, useState } from "react"
import { OrderUser } from "../../models/order-user"
import styled from "styled-components"

 type SelectCurrencyProps = {
  orderUser: OrderUser
  setOrderUser: (o: OrderUser) => void
}

const CssTextField = styled(TextField)({
  "& .css-1tzgnuz-MuiInputBase-root-MuiFilledInput-root ": {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "24px",
    paddingTop: "8px",

    input: {
      padding: "0 0 8px 12px",
    },
  },
  " .css-1tzgnuz-MuiInputBase-root-MuiFilledInput-root:after": {
    borderBottom: "2px solid #fff",
  },
})

const SelectCurrency = (props: SelectCurrencyProps) => {
  const { orderUser, setOrderUser } = props
  const [newValue, setNewValue] = useState(orderUser.order.currency)

  return (
    <div>
      <Autocomplete
        value={newValue}
        disableClearable
        onChange={(event, newValue) => {
          setNewValue(newValue)
          orderUser.order.currency = newValue
          setOrderUser({ ...orderUser })
        }}
        options={data}
        renderInput={params => <CssTextField  style={{color: 'red !important' }} {...params} variant="filled" />}
      />
    </div>
  )
}

export default SelectCurrency
