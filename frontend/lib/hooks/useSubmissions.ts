'use client';

import { useMemo } from 'react';
import { QueryKey, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import {
  PaginatedResponse,
  SubmissionDetail,
  SubmissionListFilters,
  SubmissionListItem,
} from '@/lib/types';

const SUBMISSIONS_QUERY_KEY = 'submissions';

async function fetchSubmissions(filters: SubmissionListFilters & { page?: number }) {
  const response = await apiClient.get<PaginatedResponse<SubmissionListItem>>('/submissions/', {
    params: {
      status: filters.status || undefined,
      brokerId: filters.brokerId || undefined,
      companySearch: filters.companySearch || undefined,
      createdFrom: filters.createdFrom || undefined,
      createdTo: filters.createdTo || undefined,
      hasDocuments: filters.hasDocuments,
      hasNotes: filters.hasNotes,
      page: filters.page ?? 1,
    },
  });
  return response.data;
}

async function fetchSubmissionDetail(id: string | number) {
  if (!id) {
    throw new Error('Submission id is required');
  }

  const response = await apiClient.get<SubmissionDetail>(`/submissions/${id}/`);
  return response.data;
}

export function useSubmissionsList(filters: SubmissionListFilters, page: number = 1) {
  const filtersWithPage = { ...filters, page };
  return useQuery({
    queryKey: [SUBMISSIONS_QUERY_KEY, filtersWithPage] as QueryKey,
    queryFn: () => fetchSubmissions({ ...filters, page }),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

export function useSubmissionDetail(id: string | number) {
  return useQuery({
    queryKey: [SUBMISSIONS_QUERY_KEY, id],
    queryFn: () => fetchSubmissionDetail(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useSubmissionQueryKey(filters: SubmissionListFilters) {
  return useMemo(() => [SUBMISSIONS_QUERY_KEY, filters] as QueryKey, [filters]);
}
