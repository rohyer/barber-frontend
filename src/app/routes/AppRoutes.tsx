import { BrowserRouter, Route,Routes } from 'react-router-dom';

import { OfferingsPage } from '../../modules/offerings';
import { Login } from '../../pages/auth/ui/Login';
import { Register } from '../../pages/auth/ui/Register';
import { ClientsPage } from '../../pages/client/ui/ClientsPage';
import { EmployeesPage } from '../../pages/employee/ui/Employees.page';
import MainLayout from '../../widgets/main-layout/ui/MainLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

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