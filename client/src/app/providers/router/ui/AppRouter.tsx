import { memo, Suspense, useCallback } from "react";
import { AppRoutesOptions, routeConfig } from "../config/routerConfig";
import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";

const AppRouter = memo(() => {

    const render = useCallback((route: AppRoutesOptions) => {

        const element = (
            <Suspense fallback="Loading...">
                {route.element}
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <PrivateRouter
                            roles={route.roles}
                        >
                            {element}
                        </PrivateRouter>
                    ) : (
                        element
                    )
                }
            />
        )

    }, [])

    return <Routes>
        {
            Object.values(routeConfig).map(render)
        }
    </Routes>

})

export default AppRouter;