import {RouteType} from "../models/common/route-type";
import {Login} from "../components/pages/Login";
import {Profile} from "../components/pages/Profile";

export const PATH_LOGIN = "/login"
export const PATH_PROFILE = "/profile"

export const routes: RouteType[] = [
    {path: PATH_LOGIN, element: <Login/>, label: "Login", authenticated: false},
    {path: PATH_PROFILE, element: <Profile/>, label: "Profile", authenticated: true}
]