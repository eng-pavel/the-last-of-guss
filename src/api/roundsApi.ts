import { apiClient } from './client';
import type { RoundsListResponse, RoundModel } from '../types/round';

export type RoundStatusFilter = 'active' | 'cooldown' | 'finished';

export interface GetRoundsParams {
  cursor?: string;
  limit?: number;
  status?: RoundStatusFilter;
}

export async function getRounds(params?: GetRoundsParams): Promise<RoundsListResponse> {
  const { data } = await apiClient.get<RoundsListResponse>('/api/v1/rounds', {
    params,
  });

  return data;
}

export async function createRound(): Promise<RoundModel> {
  const { data } = await apiClient.post<RoundModel>('/api/v1/rounds');
  return data;
}
