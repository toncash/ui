import { ImageAvatar } from "@twa-dev/mark42";
import { Avatar } from "@twa-dev/mark42/dist/Components/Avatar";
import React from "react";
import { Card, FlexBoxRow } from "../../styled/styled";
import { TextCommon } from "../Order";
import { UserName } from "../Profile";

const OrderListView = ({ username, amount, price, currency, orderType }) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: "20%",

          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // textAlign: "center",
        }}
      >
        <ImageAvatar
          src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png"
          size={50}
          style={
            {
              // display: 'block',
              // margin: 'auto',
            }
          }
        />
        <UserName style={{ margin: 0, padding: 0 }}>@{username}</UserName>
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <TextCommon>
          Amount <br/> <p style={{ marginTop: 10, fontStyle: 'italic', fontSize: 16}}>{amount} TON</p>
        </TextCommon>
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <TextCommon>
          Price <br /> <p style={{ marginTop: 10, fontStyle: 'italic', fontSize: 16}}>{price} {currency}</p>
        </TextCommon>
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <TextCommon>
          <p style={{ marginTop: 10, fontStyle: 'italic', fontSize: 16}}>{orderType}</p>
        </TextCommon>
      </div>
    </Card>
  );
};

export default OrderListView;
