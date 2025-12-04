import { type FormEvent, useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  const usernameError =
    touched && (trimmedUsername.length < 3 || trimmedUsername.length > 32)
      ? 'Имя пользователя от 3 до 32 символов'
      : '';

  const passwordError =
    touched && (trimmedPassword.length < 3 || trimmedPassword.length > 64)
      ? 'Пароль от 3 до 64 символов'
      : '';

  const hasClientError = Boolean(usernameError || passwordError);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);

    if (hasClientError) return;

    const ok = await login({ username: trimmedUsername, password: trimmedPassword });
    if (ok) {
      navigate('/rounds');
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <Title level={4} style={{ margin: 0 }}>
          Войти
        </Title>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <div className="page-section">
          <label className="field-label">
            Имя пользователя:
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
          {usernameError && (
            <Text type="danger" style={{ display: 'block', marginTop: 4 }}>
              {usernameError}
            </Text>
          )}
        </div>

        <div className="page-section">
          <label className="field-label">
            Пароль:
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {passwordError && (
            <Text type="danger" style={{ display: 'block', marginTop: 4 }}>
              {passwordError}
            </Text>
          )}
        </div>

        <div className="page-section">
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Войти
          </Button>
        </div>

        <Text type="danger" style={{ display: 'block', minHeight: 20, marginTop: 8 }}>
          {error}
        </Text>
      </form>
    </section>
  );
}
