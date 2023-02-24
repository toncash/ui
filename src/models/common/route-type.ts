import {ReactElement, ReactNode} from "react";

export type RouteType = {
    path: string;
    element: ReactNode;
    label: string;
    authenticated?: boolean;
    childRoutes?: RouteType[];
    indexElement?: ReactNode;
    icon?: ReactElement;
}