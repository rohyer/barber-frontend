import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from '../modules/auth/pages/Register';
import { Login } from '../modules/auth/pages/Login';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>  
    );
}