import { memo, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface PrivateRouterProps {
    children: ReactNode
    roles: string | undefined
}

const PrivateRouter = memo(({children}:PrivateRouterProps) => {

    const isLoading = useSelector((state:RootState)=>state?.user?.isLoading)
    const auth = useSelector((state:RootState)=>state?.user?.auth)
    const role = useSelector((state:RootState)=>state?.user?.role)
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