import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import { myTheme } from './design-system/theme/myTheme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={myTheme}>
            <App />
        </ConfigProvider>
    </StrictMode>,
);
