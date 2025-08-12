import './App.css';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
