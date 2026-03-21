import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from '../modules/auth/pages/Register';
import { Login } from '../modules/auth/pages/Login';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import MainLayout from '../layout/MainLayout';
import { ClientsPage } from '../modules/clients/pages/ClientsPage';
import { EmployeesPage } from '../modules/employees/pages/Employees.page';
import { OfferingsPage } from '../modules/offerings/pages/Offerings.page';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path='/cadastro' element={<Register />} />
                    <Route path='/login' element={<Login />}  />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path='/' element={<MainLayout />}>
                        <Route path='/atendimentos' />
                        <Route path='/clientes' element={<ClientsPage />} />
                        <Route path='/colaboradores' element={<EmployeesPage />} />
                        <Route path='/servicos' element={<OfferingsPage />} />
                        <Route path='/estatisticas' />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>  
    );
}