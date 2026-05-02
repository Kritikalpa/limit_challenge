'use client';

import {
  Box,
  Card,
  CardContent,
  Container,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useSubmissionsList } from '@/lib/hooks/useSubmissions';
import { SubmissionListFilters, SubmissionStatus } from '@/lib/types';
import { FilterBar } from './components/FilterBar';
import { SubmissionTable } from './components/SubmissionTable';
import { SubmissionListSkeleton } from './components/SubmissionListSkeleton';
import { EmptyState, ErrorState } from './components/EmptyState';
import { useRouter, usePathname } from 'next/navigation';

const PAGE_SIZE = 10;

function SubmissionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = (searchParams.get('status') as SubmissionStatus) || undefined;
  const brokerId = searchParams.get('brokerId') || undefined;
  const companySearch = searchParams.get('companySearch') || undefined;
  const createdFrom = searchParams.get('createdFrom') || undefined;
  const createdTo = searchParams.get('createdTo') || undefined;
  const hasDocuments = searchParams.get('hasDocuments') === 'true' || undefined;
  const hasNotes = searchParams.get('hasNotes') === 'true' || undefined;
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const filters: SubmissionListFilters = useMemo(
    () => ({ status, brokerId, companySearch, createdFrom, createdTo, hasDocuments, hasNotes }),
    [status, brokerId, companySearch, createdFrom, createdTo, hasDocuments, hasNotes],
  );

  const hasFilters = !!(status || brokerId || companySearch || createdFrom || createdTo || hasDocuments || hasNotes);

  const submissionsQuery = useSubmissionsList(filters, page);
  const brokerQuery = useBrokerOptions();

  const totalPages = submissionsQuery.data
    ? Math.ceil(submissionsQuery.data.count / PAGE_SIZE)
    : 0;

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(newPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Submissions
          </Typography>
          <Typography color="text.secondary" mt={0.5}>
            Browse and filter incoming broker submissions.
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <FilterBar brokers={brokerQuery.data ?? []} />
          </CardContent>
        </Card>

        <Card variant="outlined">
          {submissionsQuery.data && (
            <Box px={2} pt={2} pb={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {submissionsQuery.data.count === 0
                  ? 'No results'
                  : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, submissionsQuery.data.count)} of ${submissionsQuery.data.count} submissions`}
              </Typography>
            </Box>
          )}

          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, overflowX: 'auto' }}>
            {submissionsQuery.isPending && <Box p={2}><SubmissionListSkeleton /></Box>}

            {submissionsQuery.isError && (
              <Box p={2}>
                <ErrorState onRetry={() => submissionsQuery.refetch()} />
              </Box>
            )}

            {submissionsQuery.isSuccess && submissionsQuery.data.results.length === 0 && (
              <EmptyState hasFilters={hasFilters} onClearFilters={handleClearFilters} />
            )}

            {submissionsQuery.isSuccess && submissionsQuery.data.results.length > 0 && (
              <SubmissionTable submissions={submissionsQuery.data.results} />
            )}
          </CardContent>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" py={3} borderTop="1px solid" borderColor="divider">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Card>
      </Stack>
    </Container>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense>
      <SubmissionsContent />
    </Suspense>
  );
}
