'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { Broker, PaginatedResponse } from '@/lib/types';

async function fetchBrokers() {
  const response = await apiClient.get<PaginatedResponse<Broker> | Broker[]>('/brokers/');
  // DRF returns a paginated wrapper; unwrap if needed
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<Broker>).results;
}

export function useBrokerOptions() {
  return useQuery({
    queryKey: ['brokers'],
    queryFn: fetchBrokers,
    staleTime: Infinity,
  });
}
