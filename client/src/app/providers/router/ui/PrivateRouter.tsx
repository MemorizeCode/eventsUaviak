import { memo, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
    children: ReactNode
    roles: string | undefined
}

const PrivateRouter = memo(({children}:PrivateRouterProps) => {

    const isLoading = useSelector((state:any)=>state?.user?.isLoading)
    const auth = useSelector((state:any)=>state?.user?.auth)
    const role = useSelector((state:any)=>state?.user?.role)
    if(isLoading) {
        return null
    }

    if(auth){
        if(role == 'admin' || role == "ADMIN"){
            return children
        }
        return <Navigate to={'/'} replace />
    }
    return <Navigate to={'/'} replace />
})
 
export default PrivateRouter;