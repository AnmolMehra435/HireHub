import { Navigate, Outlet } from 'react-router-dom';
import userAuthStore from '@/store/authStore';

function PublicRoute(){
    const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
    const user = userAuthStore((state) =>
        state.user);

    if(isAuthenticated){
        switch(user?.role){
            case "admin":
                return (<Navigate to='/admin/dashboard' replace />)
            
            case "candidate":
                return (<Navigate to="/candidate/dashboard" replace />)
                
            case "employer":
               return (<Navigate to="/employer/dashboard" replcae />)
            
            default:
                return (<Navigate to="/" replace />)
        }
    }else{
        return <Outlet/>
    }
}

export default PublicRoute