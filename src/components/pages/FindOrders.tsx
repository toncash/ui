import React from "react";
import styled from "styled-components";
import { Button, Icon } from "../styled/styled";
import { orders } from "../test_data/data";
import OrderListView from "./parts/OrderListView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { TextCommon } from "./Order";

const FindOrders = () => {
  return (
    <div>
      <div className="headerFindOrders" style={{display: 'flex', flexDirection: 'row'}}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        
        <TextCommon>Orders</TextCommon>
      </div>
      {orders.map((order) => (
        <OrderListView
          username={order.username}
          amount={order.amount}
          price={order.price}
          currency={order.currency}
          orderType={order.orderType}
          key={order.username}
        />
      ))}
      <Button style={{marginTop: 20, width: '100%', background: 'green'}}>Open map</Button>
    </div>
  );
};

export default FindOrders;
