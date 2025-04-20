import { AdminPage } from "@/pages/AdminPage"
import { EventsPage } from "@/pages/EventsPage"
import { LoginPage } from "@/pages/LoginPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { RegisterPage } from "@/pages/RegisterPage"
import { ReviewsPage } from "@/pages/ReviewsPage"

import { RouteProps } from "react-router-dom"

enum AppRoutes {
    "Main" = "Main", //Главная
    "Admin" = "Admin", //Админка
    "Events" = "Events", //Мероприятия
    "Login" = "Login", //Записаться
    "Reviews" = "Reviews",
    "Register" = "Register",
    "NotFound" = "NotFound" //Не найдена
}
export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: "/",
    [AppRoutes.Admin]: "/admin",
    [AppRoutes.Events]: "/events",
    [AppRoutes.Login]: "/login",
    [AppRoutes.Register]: "/hideregister",
    [AppRoutes.Reviews]: "/reviews",
    [AppRoutes.NotFound]: "*",
}

export type AppRoutesOptions = RouteProps & {
    authOnly?: boolean
    roles?: string | undefined
}


export const routeConfig: Record<AppRoutes, AppRoutesOptions> = {
    [AppRoutes.Main]: {
        path: RoutesPath.Main,
        element: <MainPage />
    },
    [AppRoutes.Admin]: {
        path: RoutesPath.Admin,
        element: <AdminPage />,
        authOnly: true,
        roles: 'admin'
    },
    [AppRoutes.Events]: {
        path: RoutesPath.Events,
        element: <EventsPage />
    },
    [AppRoutes.Login]: {
        path: RoutesPath.Login,
        element: <LoginPage />
    },
    [AppRoutes.Register]: {
        path: RoutesPath.Register,
        element: <RegisterPage />
    },
    [AppRoutes.Reviews]: {
        path: RoutesPath.Reviews,
        element: <ReviewsPage />
    },
    [AppRoutes.NotFound]: {
        path: RoutesPath.NotFound,
        element: <NotFoundPage />
    }
}