import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography } from 'antd';
import { LoginPage } from './pages/LoginPage';
import { RoundsListPage } from './pages/RoundsListPage';
import { RoundPage } from './pages/RoundPage';
import { useAuth } from './context/AuthContext';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Layout className="app">
      <Header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-title">The Last of Guss</div>

          {user && (
            <div className="app-header-user">
              <Text style={{ marginRight: 12 }}>Игрок: {user.username}</Text>
              <Button size="small" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          )}
        </div>
      </Header>

      <Content className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rounds" element={<RoundsListPage />} />
          <Route path="/rounds/:id" element={<RoundPage />} />
        </Routes>
      </Content>

      <Footer className="app-footer">
        <span>Pavel Pogorelov </span>
        <a href="https://t.me/ng_pablo" target="_blank" rel="noreferrer">
          @ng_pablo
        </a>
        <span> · </span>
        <a href="https://cv.engineerpavel.ru" target="_blank" rel="noreferrer">
          cv.engineerpavel.ru
        </a>
      </Footer>
    </Layout>
  );
}

export default App;
