import { Typography } from 'antd';

const { Title, Text } = Typography;

export function RoundPage() {
  // позже возьмём id раунда из useParams и подтянем данные с API
  return (
    <section className="page">
      <header className="page-header">
        <Title level={4} style={{ margin: 0 }}>
          Раунд
        </Title>
      </header>

      <div className="page-section" style={{ textAlign: 'center' }}>
        {/* Пока вместо гуся просто заглушка */}
        <div
          style={{
            width: 260,
            height: 200,
            margin: '0 auto 24px',
            border: '1px dashed #777',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          [ GUSS AREA ]
        </div>

        <Text>Раунд активен!</Text>
        <br />
        <Text>До конца осталось: 00:23</Text>
        <br />
        <Text>Мои очки — 123</Text>
      </div>
    </section>
  );
}
