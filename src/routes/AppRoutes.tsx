import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from '../modules/auth/pages/Register';
import { Login } from '../modules/auth/pages/Login';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import MainLayout from '../layout/MainLayout';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path='/cadastro' element={<Register />} />
                    <Route path='/login' element={<Login />}  />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path='/' element={<MainLayout />} />
                </Route>
            </Routes>
        </BrowserRouter>  
    );
}