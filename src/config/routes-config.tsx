import {RouteType} from "../models/common/route-type";
import {Login} from "../components/pages/Login";
import {Profile} from "../components/pages/Profile";
import {CreateOrder} from "../components/pages/CreateOrder";
import {FindOrder} from "../components/pages/FindOrder";

import {PATH_LOGIN, PATH_PROFILE, PATH_CREATEORDER, PATH_FINDORDER} from "../components/config/routes-config"

export const routes: RouteType[] = [
    {path: PATH_LOGIN, element: <Login/>, label: "Login"},
    {path: PATH_PROFILE, element: <Profile/>, label: "Profile"},
    {path: PATH_CREATEORDER, element: <CreateOrder/>, label: "CreateOrder"},
    {path: PATH_FINDORDER, element: <FindOrder/>, label: "FindOrder"}
]