export interface RoundModel {
  id: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  createdAt: string;
}

export interface RoundUserStats {
  taps: number;
  score: number;
}

export interface RoundTopEntry {
  taps: number;
  score: number;
  user: {
    username: string;
  };
}

export interface RoundDetailsResponse {
  round: RoundModel;
  topStats: RoundTopEntry[];
  myStats: RoundUserStats;
}

export interface Pagination {
  limit: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface RoundsListResponse {
  data: RoundModel[];
  pagination: Pagination;
}
