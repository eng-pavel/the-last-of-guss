import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { LoginPage } from './pages/LoginPage';
import { RoundsListPage } from './pages/RoundsListPage';
import { RoundPage } from './pages/RoundPage.tsx';

const { Header, Content } = Layout;

function App() {
    return (
        <BrowserRouter>
            <Layout className="app">
                <Header className="app-header">
                    The Last of Guss
                </Header>

                <Content className="app-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/rounds" element={<RoundsListPage />} />
                        <Route path="/rounds/:id" element={<RoundPage />} />
                    </Routes>
                </Content>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
