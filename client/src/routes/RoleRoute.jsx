import { Navigate, Outlet } from 'react-router-dom';
import userAuthStore from '@/store/authStore'

function RoleRoute( {allowedRoles} ){
    const user = userAuthStore((state) => state.user);
    if(!allowedRoles.includes(user?.role)){
        return <Navigate to='/unauthorized' replace/>
    }else{
        return <Outlet/>;
    }
}

export default RoleRoute;