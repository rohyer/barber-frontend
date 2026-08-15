import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { SessionProvider } from '../entities/session/model/SessionProvider';
import { AppRoutes } from './routes/AppRoutes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <AppRoutes />
                <ReactQueryDevtools initialIsOpen={false} />
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default App;
