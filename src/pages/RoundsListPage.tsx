import { useEffect, useState } from 'react';
import { Button, Typography, Spin, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { RoundModel } from '../types/round';
import { getRounds, createRound } from '../api/roundsApi';
import { getRoundStatus, type RoundStatus } from '../utils/roundStatus';
import { formatDateTime } from '../utils/format';

const { Title, Text } = Typography;

interface RoundWithStatus extends RoundModel {
  status: RoundStatus;
}

export function RoundsListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [rounds, setRounds] = useState<RoundWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadRounds = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getRounds({ limit: 20 });

        if (cancelled) return;

        const now: Date = new Date();
        const withStatus: RoundWithStatus[] = response.data.map((round) => ({
          ...round,
          status: getRoundStatus(round, now),
        }));

        setRounds(withStatus);
      } catch {
        if (!cancelled) {
          setError('Не удалось загрузить список раундов');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadRounds();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateRound = async () => {
    try {
      setIsCreating(true);
      setError(null);

      const round = await createRound();
      navigate(`/rounds/${round.id}`);
    } catch {
      setError('Не удалось создать раунд');
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusLabel = (status: RoundStatus): string => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'cooldown':
        return 'Cooldown';
      case 'finished':
        return 'Завершен';
      default:
        return status;
    }
  };

  return (
    <section className="page">
      <header className="page-header rounds-header">
        <Title level={4} style={{ margin: 0 }}>
          Список раундов
        </Title>

        <Text>Имя игрока: {user?.username ?? '—'}</Text>
      </header>

      {user?.role === 'ADMIN' && (
        <div className="page-section">
          <Button onClick={handleCreateRound} loading={isCreating}>
            Создать раунд
          </Button>
        </div>
      )}

      {error && (
        <div className="page-section">
          <Alert type="error" title={error} showIcon />
        </div>
      )}

      <div className="page-section rounds-list">
        {isLoading && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <Spin />
          </div>
        )}

        {!isLoading && rounds.length === 0 && !error && <Text>Раунды пока не созданы.</Text>}

        {rounds.map((round) => (
          <div key={round.id} className="round-card">
            <div className="round-row">
              <div>
                • Round ID: <Link to={`/rounds/${round.id}`}>{round.id}</Link>
              </div>
              <Text>{getStatusLabel(round.status)}</Text>
            </div>

            <div className="round-meta">
              <div>Start: {formatDateTime(round.startTime)}</div>
              <div>End:&nbsp;&nbsp;{formatDateTime(round.endTime)}</div>
            </div>

            <div className="round-status">Статус: {getStatusLabel(round.status)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
