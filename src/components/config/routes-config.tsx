import { Auth } from '../pages/Auth';
import { RouteType } from '../models/common/route-type';
import { profile } from 'console';
import { MainInfo } from '../pages/MainInfo';
export const PATH_LOGIN = "/login"
export const PATH_PROFILE = "/profile"

export const routes : RouteType[] = [
    {path: PATH_LOGIN, element: <Auth/>, label:"Login"},
    {path: PATH_PROFILE, element: <MainInfo/>, label:"profile" },
]