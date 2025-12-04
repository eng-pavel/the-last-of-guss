import { Form, Input, Button, Typography } from 'antd';

const { Title, Text } = Typography;

export function LoginPage() {
  const [form] = Form.useForm();

  const handleSubmit = (values: { username: string; password: string }) => {
    // здесь позже добавим реальный запрос /api/v1/auth/login
    console.log('login submit', values);
  };

  return (
    <section className="page">
      <header className="page-header">
        <Title level={4} style={{ margin: 0 }}>
          Войти
        </Title>
      </header>

      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          label="Имя пользователя:"
          name="username"
          rules={[
            { required: true, message: 'Введите имя пользователя' },
            { min: 3, max: 32 },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль:"
          name="password"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 3, max: 64 },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>

        {/* место под текст ошибки под кнопкой */}
        <Text type="danger" style={{ display: 'block', minHeight: 20 }}>
          {/* позже сюда подставим текст ошибки с бэкенда */}
        </Text>
      </Form>
    </section>
  );
}
