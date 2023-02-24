import { ReactElement, ReactNode } from "react";

export type RouteType = {
    path: string;
    element: ReactNode;
    label: string;
    childRoutes?: RouteType[];
    indexElement?: ReactNode;
    icon?: ReactElement;
    authenticated?: boolean;
}
