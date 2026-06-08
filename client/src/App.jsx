import { BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import NotificationToast from './components/layout/NotificationToast';
import ProtectedRoute from './routes/ProtectedRoutes';
import CandidateDashboard from './pages/CandidateDashboard';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RoleRoute from './routes/RoleRoute';
import PublicRoute from './routes/PublicRoutes';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App(){
    return(
        <>
        <NotificationToast/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route element={<PublicRoute/>}>
                <Route path='/login' element={<LoginPage/>}/>
                </Route>
                <Route element={<PublicRoute/>}>
                <Route path='/register' element={<RegisterPage/>}/>
                </Route>
                <Route path='/jobs' element={<JobsPage/>}/>
                <Route path='/jobs/:id' element={<JobDetailPage/>}/>
                <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route element={<ProtectedRoute/>}>
                 <Route element={<RoleRoute allowedRoles={["candidate"]} /> } >
                    <Route path="/candidate/dashboard" element={<CandidateDashboard/>}/>
                    </Route>
                </Route>
                <Route element={<ProtectedRoute/>}>
                 <Route element={<RoleRoute allowedRoles={["employer"]} /> } >
                    <Route path="/employer/dashboard" element={<EmployerDashboard/>}/>
                    </Route>
                </Route>
                <Route element={<ProtectedRoute/>}>
                 <Route element={<RoleRoute allowedRoles={["admin"]} /> } >
                    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    )
}

export default App;