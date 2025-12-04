export interface RoundModel {
  id: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  createdAt: string;
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
