import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './styles.css';
import 'antd/dist/reset.css'; // сброс стилей antd

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider>
            <App />
        </ConfigProvider>
    </React.StrictMode>,
);
