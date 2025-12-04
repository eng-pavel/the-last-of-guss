import type { RoundModel } from '../types/round';

export type RoundStatus = 'active' | 'cooldown' | 'finished';

export function getRoundStatus(round: RoundModel, now: Date = new Date()): RoundStatus {
  const start = new Date(round.startTime).getTime();
  const end = new Date(round.endTime).getTime();
  const current = now.getTime();

  if (current < start) return 'cooldown';
  if (current <= end) return 'active';
  return 'finished';
}

export function getRemainingSeconds(
  round: RoundModel,
  status: RoundStatus,
  now: Date = new Date(),
): number {
  let targetTime: number | null = null;

  if (status === 'cooldown') {
    targetTime = new Date(round.startTime).getTime();
  } else if (status === 'active') {
    targetTime = new Date(round.endTime).getTime();
  }

  if (targetTime === null) {
    return 0;
  }

  const diffMs = targetTime - now.getTime();
  const seconds = Math.floor(diffMs / 1000);

  return seconds > 0 ? seconds : 0;
}
