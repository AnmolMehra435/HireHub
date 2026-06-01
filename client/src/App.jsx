import { BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/jobs' element={<JobsPage/>}/>
                <Route path='/jobs/:id' element={<JobDetailPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
          
    )
}

export default App;