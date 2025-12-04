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
