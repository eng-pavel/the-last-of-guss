import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

// временный мок для одного раунда;
const mockRoundId = '8c3eed83-8a8a-41a0-8f91-9ad501e8f8a1';

export function RoundsListPage() {
  return (
    <section className="page">
      <header className="page-header">
        <Title level={4} style={{ margin: 0 }}>
          Список раундов
        </Title>
      </header>

      <div className="page-section" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button /* позже покажем только для админа */>Создать раунд</Button>

        <Text>Имя игрока: (заглушка)</Text>
      </div>

      <div className="page-section">
        <div style={{ border: '1px dashed #666', padding: 12, marginBottom: 16 }}>
          <div>
            • Round ID: <Link to={`/rounds/${mockRoundId}`}>{mockRoundId}</Link>
          </div>

          <div style={{ marginTop: 8 }}>
            <div>Start: 18.05.2025, 06:28:17</div>
            <div>End: 18.05.2025, 06:29:17</div>
          </div>

          <div style={{ marginTop: 12 }}>Статус: Активен</div>
        </div>
      </div>
    </section>
  );
}
