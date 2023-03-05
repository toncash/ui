import {PATH_PROFILE, routes} from "./config/routes-config";
import { Pages, StyledApp } from "./components/pages/Pages"
import "./App.css";
import { Login } from "./components/pages/Login";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import React, {ReactNode, useEffect, useState} from "react";

import {useTonConnect} from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import {TonConnectButton} from "@tonconnect/ui-react";




const App = () => {
    const { connected, isLoading} = useTonConnect();


    function getRoutes(): ReactNode[] {
        return routes.map(r => (
            <Route key={r.path} path={r.path} element={r.element} ></Route>))
    }
    
    // if (isLoading) return null;

    return (
        <StyledApp>
            <TonConnectButton style={{ minWidth: 250, height: 50, padding: 25  }} />
            {connected?
                <BrowserRouter>
                    <Routes>
                        {getRoutes()}
                            <Route path="/ui/*" element={<Navigate to={PATH_PROFILE} />} />
                    </Routes>
                </BrowserRouter>
                :
                <Login/>
            }

        </StyledApp>
    )
}

export default App