import { Pages, StyledApp } from "./components/pages/Pages"
import "./App.css";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";
import { Order } from "./components/pages/Order";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactNode, useState } from "react";
import { PATH_LOGIN, PATH_PROFILE, routes } from "./components/config/routes-config";
import {useTonConnect} from "./hooks/useTonConnect";
import "@twa-dev/sdk";


const App = () => {
    const {connected} = useTonConnect()

    function getRoutes(): ReactNode[] {
        return routes.map(r => (
            <Route key={r.path} path={r.path} element={r.element} ></Route>))
    }
    return (
        <StyledApp>
            <BrowserRouter>
                <Routes>
                    {getRoutes()}
                    {
                        <Route path="/" element={<Navigate to={connected ? PATH_PROFILE : PATH_LOGIN} />} />
                    }
                </Routes>
            </BrowserRouter>
        </StyledApp>
    )
}

export default App