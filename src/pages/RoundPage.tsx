import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Spin, Typography } from 'antd';
import type { RoundModel, RoundTopEntry, RoundUserStats } from '../types/round';
import { getRoundDetails, tapRound } from '../api/roundsApi';
import { getRoundStatus, getRemainingSeconds, type RoundStatus } from '../utils/roundStatus';
import { formatSeconds } from '../utils/format';
import { useAuth } from '../context/AuthContext';
import gooseImage from '../assets/goose.png';

const { Title, Text } = Typography;

export function RoundPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [round, setRound] = useState<RoundModel | null>(null);
  const [topStats, setTopStats] = useState<RoundTopEntry[]>([]);
  const [myStats, setMyStats] = useState<RoundUserStats>({ taps: 0, score: 0 });

  const [status, setStatus] = useState<RoundStatus>('cooldown');
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTapping, setIsTapping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1) грузим данные раунда
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getRoundDetails(id);
        if (cancelled) return;

        const now = new Date();
        const roundStatus = getRoundStatus(response.round, now);
        const remain = getRemainingSeconds(response.round, roundStatus, now);

        setRound(response.round);
        setTopStats(response.topStats);
        setMyStats(response.myStats);
        setStatus(roundStatus);
        setSecondsLeft(remain);
      } catch {
        if (!cancelled) {
          setError('Не удалось загрузить данные раунда');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // 2) таймер завязан только на параметрах раунда, а не на моих тапах
  useEffect(() => {
    if (!round) return;

    const intervalId = window.setInterval(() => {
      const now = new Date();
      const newStatus = getRoundStatus(round, now);
      const remain = getRemainingSeconds(round, newStatus, now);

      setStatus(newStatus);
      setSecondsLeft(remain);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [round?.id, round?.startTime, round?.endTime]);

  const handleTap = async () => {
    if (!id || !round) return;
    if (status !== 'active' || isTapping) return;

    try {
      setIsTapping(true);
      const stats = await tapRound(id);
      setMyStats(stats); // меняем только свою статистику, таймер не трогаем
    } catch {
      // можно добавить отображение ошибки
    } finally {
      setIsTapping(false);
    }
  };

  const headerTitle: string = useMemo(() => {
    switch (status) {
      case 'active':
        return 'Раунды';
      case 'cooldown':
        return 'Cooldown';
      case 'finished':
        return 'Раунд завершен';
      default:
        return 'Раунд';
    }
  }, [status]);

  const statusTextBlock = useMemo(() => {
    if (!round) return null;

    if (status === 'active') {
      return (
        <>
          <Text>Раунд активен!</Text>
          <br />
          <Text>До конца осталось: {formatSeconds(secondsLeft)}</Text>
          <br />
          <Text>Мои очки — {myStats.score}</Text>
        </>
      );
    }

    if (status === 'cooldown') {
      return (
        <>
          <Text>Cooldown</Text>
          <br />
          <Text>до начала раунда {formatSeconds(secondsLeft)}</Text>
        </>
      );
    }

    const winner = topStats[0];

    return (
      <>
        <Text>Всего очков в раунде — {round.totalScore}</Text>
        <br />
        {winner && (
          <Text>
            Победитель — {winner.user.username}&nbsp;{winner.score}
          </Text>
        )}
        <br />
        <Text>Мои очки — {myStats.score}</Text>
      </>
    );
  }, [round, status, secondsLeft, myStats, topStats]);

  return (
    <section className="page">
      <header className="page-header round-header-row">
        <Title level={4} style={{ margin: 0 }}>
          {headerTitle}
        </Title>
        <Text>Имя игрока: {user?.username ?? '—'}</Text>
      </header>

      {isLoading && (
        <div className="page-section" style={{ textAlign: 'center', padding: 24 }}>
          <Spin />
        </div>
      )}

      {error && (
        <div className="page-section">
          <Alert type="error" message={error} showIcon />
        </div>
      )}

      {round && !isLoading && !error && (
        <>
          <div className="page-section" style={{ textAlign: 'center' }}>
            <div
              className={`goose-area${status !== 'active' ? ' goose-area-inactive' : ''}`}
              onClick={handleTap}
              role={status === 'active' ? 'button' : undefined}
            >
              <img src={gooseImage} alt="Мутировавший гусь G-42" className="goose-image" />
            </div>

            {status === 'active' ? (
              <Text style={{ display: 'block', marginTop: 8 }}>Тапай по гусю!</Text>
            ) : (
              <Text style={{ display: 'block', marginTop: 8 }}>Гусь отдыхает</Text>
            )}

            {status === 'active' && (
              <div style={{ marginTop: 12 }}>
                <Button type="primary" onClick={handleTap} loading={isTapping}>
                  Тапнуть
                </Button>
              </div>
            )}
          </div>

          <div className="page-section round-text-block">{statusTextBlock}</div>

          {topStats.length > 0 && (
            <div className="page-section stats-block">
              <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
                Топ раунда
              </Title>
              {topStats.map((entry) => (
                <div key={entry.user.username} className="stats-row">
                  <span>{entry.user.username}</span>
                  <span>{entry.score}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
