import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SessionProvider } from '@/entities/session';

import { AppRoutes } from './routes/AppRoutes';

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
