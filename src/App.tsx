import { Pages, StyledApp } from "./components/pages/Pages"
import "./App.css";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";
import { Order } from "./components/pages/Order";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React, {ReactNode, useEffect, useState} from "react";
import { PATH_LOGIN, PATH_PROFILE, routes } from "./config/routes-config";
import {useTonConnect} from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import {TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {RouteType} from "./models/common/route-type";
import FindOrders from "./components/pages/FindOrders";


const App = () => {
    const { connected } = useTonConnect();


    function getRoutes(): ReactNode[] {
        return routes.map(r => (
            <Route key={r.path} path={r.path} element={r.element} ></Route>))
    }
    return (
        <StyledApp>
            
            {/* <TonConnectButton style={{ minWidth: 250, height: 50, padding: 25  }} /> */}
            <FindOrders/>
            {/* <Order/> */}
            {/* {connected?
                <BrowserRouter>
                    <Routes>
                        {getRoutes()}
                        {
                            <Route path="/ui/" element={<Navigate to={PATH_PROFILE} />} />
                        }
                    </Routes>
                </BrowserRouter>
                :
                <Login/>
            } */}

        </StyledApp>
    )
}

export default App