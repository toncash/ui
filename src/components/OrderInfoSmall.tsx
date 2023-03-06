import React from "react"
import { orders } from "./test_data/data"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { ImageAvatar } from "@twa-dev/mark42"
import { UserName } from "./pages/profile/Profile"
import { TextCommon } from "./pages/FindOrder"
import { Button } from "./styled/styled"

const OrderInfoSmall = () => {
  const order = orders[3]
  return (
    <div>
      <Card
        sx={{
          maxWidth: "180px",
          borderRadius: 10,
          backgroundColor: "lightgray",
        }}
      >
        <CardContent sx={{ padding: 1 }}>
          <div style={{ display: "flex" }}>
            <div
              style={
                {
                  // display: "flex",
                  // flexDirection: "column",
                  // justifyContent: "center",
                  // textAlign: "center",
                }
              }
            >
              <ImageAvatar
                src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"
                size={50}
                style={{
                  display: "block",
                  margin: "auto",
                }}
              />
              <UserName style={{ margin: 0, padding: 0, fontSize: 14 }}>@{order.username}</UserName>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginLeft: 5,
              }}
            >
              <TextCommon
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Price
                <p
                  style={{
                    marginTop: 0,
                    fontStyle: "italic",
                    fontSize: 12,
                  }}
                >
                  {order.price}
                  {order.currency}
                </p>
              </TextCommon>
              <TextCommon
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Amount <br />
                <span
                  style={{
                    marginTop: 0,
                    fontStyle: "italic",
                    fontSize: 12,
                  }}
                >
                  {order.amount}TON
                </span>
              </TextCommon>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextCommon
              style={{
                margin: 0,
                padding: 0,
                paddingRight: 5,
                fontStyle: "italic",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {order.total} Orders
            </TextCommon>

            <TextCommon
              style={{
                margin: 0,
                padding: 0,
                fontStyle: "italic",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {((order.totalClosed / order.total) * 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              % Complete
            </TextCommon>
          </div>
          <TextCommon
            style={{
              margin: "10px 0 0",
              padding: 0,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Limits: <span style={{ fontStyle: "italic", fontSize: 12 }}>$15 - ${order.limit}</span>
          </TextCommon>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: 0,
            paddingTop: 0,
          }}
        >
          <Button style={{ backgroundColor: "green" }}>{order.orderType === "SELL" ? "Buy TON" : "Sell TON"}</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default OrderInfoSmall
