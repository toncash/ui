import { ImageAvatar } from "@twa-dev/mark42";
import { Avatar } from "@twa-dev/mark42/dist/Components/Avatar";
import React from "react";
import { Card, FlexBoxRow } from "../../styled/styled";
import { TextCommon } from "../FindOrder"
import { UserName } from "../Profile";

const OrderListView = ({ order }: {order: any}) => {
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
        <UserName style={{ margin: 0, padding: 0 }}>@{order.username}</UserName>
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <TextCommon>
          Amount <br/> <span style={{ marginTop: 10, fontStyle: 'italic', fontSize: 16}}>{order.amount} TON</span>
        </TextCommon>
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <TextCommon>
          Price <br /> <span style={{ marginTop: 10, fontStyle: 'italic', fontSize: 16}}>{order.price} {order.currency}</span>
        </TextCommon>
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <TextCommon style={{ marginTop: 10, fontStyle: 'italic', fontSize: 16}}>
          {order.orderType}
        </TextCommon>
      </div>
    </Card>
  );
};

export default OrderListView;
