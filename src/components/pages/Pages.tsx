
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "../Counter";
import { Jetton } from "../Jetton";
import { TransferTon } from "../TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "../styled/styled";
import { useTonConnect } from "../../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { Routes } from "react-router-dom";

export const StyledApp = styled.div`
  background-color: #d7f1f7;
  color: black;

  // @media (prefers-color-scheme: dark) {
  //   background-color: #222;
  //   color: white;
  // }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Pages = () => {
  const { network } = useTonConnect();

  return (
  
<Routes>
    <StyledApp>
    <Profile />
    {/* <AppContainer>
      <FlexBoxCol>
        <FlexBoxRow>
          <Login />
          <Button>
            {network
              ? network === CHAIN.MAINNET
                ? "mainnet"
                : "testnet"
              : "N/A"}
          </Button>
        </FlexBoxRow>
        <Counter />
        <TransferTon />
        <Jetton />
      </FlexBoxCol>
    </AppContainer> */}
  </StyledApp>
  </Routes>      
  );
}

