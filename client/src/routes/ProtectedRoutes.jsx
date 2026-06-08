import { Navigate, Outlet, useLocation } from "react-router-dom";
import userAuthStore from "@/store/authStore";

function ProtectedRoute(){
    const isAuthenticated = userAuthStore((state) => state.isAuthenticated);

    const location = useLocation();
    if(!isAuthenticated){
        return (
            <Navigate
                to='/login'
                state={{ from: location }}
                replace
            />
        )
    }else{
        return <Outlet/>
    }
}

export default ProtectedRoute