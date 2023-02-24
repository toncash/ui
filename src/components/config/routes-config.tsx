import { Login } from '../pages/Login';
import { RouteType } from '../models/common/route-type';
import { profile } from 'console';
import { Profile } from '../pages/Profile';
export const PATH_LOGIN = "/login"
export const PATH_PROFILE = "/profile"

export const routes : RouteType[] = [
    {path: PATH_LOGIN, element: <Login/>, label:"Login"},
    {path: PATH_PROFILE, element: <Profile/>, label:"profile" },
]