import React from "react";
import styled from "styled-components";
import { Button } from "../styled/styled";
import { orders } from "../test_data/data";
import OrderListView from "./parts/OrderListView";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { TextCommon } from "./FindOrder";
import {PATH_FINDORDER} from "../../config/routes-config";
import {ButtonOrder} from "./Profile";
import {useNavigate} from "react-router-dom";

const FindOrders = () => {
    const navigate = useNavigate();
  function order(
    username: string,
    amount: number,
    price: number,
    currency: string,
    orderType: string
  ) {
    return { username, amount, price, currency, orderType };
  }
  return (
    <div>
      <div
        className="headerFindOrders"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>

        <TextCommon>Orders</TextCommon>
      </div>
      {orders.map((order) => (
        <OrderListView
          order={order}
          key={order.username}
        />
      ))}
      <Button onClick={()=> {navigate(PATH_FINDORDER)}} style={{ marginTop: 20, width: "100%", background: "green" }}>
        Open map
      </Button>
    </div>
  );
};

export default FindOrders;
