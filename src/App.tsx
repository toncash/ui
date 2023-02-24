import { Pages, StyledApp } from "./components/pages/Pages"
import "./App.css";
import { MainInfo } from "./components/pages/MainInfo";
import { Auth } from "./components/pages/Auth";
import { Order } from "./components/pages/Order";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactNode, useState } from "react";
import { PATH_LOGIN, PATH_PROFILE, routes } from "./components/config/routes-config";



const App = () => {
    const [auth, setAuth] = useState(true)

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
                        <Route path="/" element={<Navigate to={auth ? PATH_PROFILE : PATH_LOGIN} />} />
                    }
                </Routes>
            </BrowserRouter>
        </StyledApp>
    )
}

export default App