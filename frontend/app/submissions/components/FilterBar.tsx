'use client';

import { Box, Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { Broker, SubmissionStatus } from '@/lib/types';

const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];

interface FilterBarProps {
  brokers: Broker[];
}

export function FilterBar({ brokers }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<SubmissionStatus | ''>(
    (searchParams.get('status') as SubmissionStatus) ?? '',
  );
  const [brokerId, setBrokerId] = useState(searchParams.get('brokerId') ?? '');
  const [companyQuery, setCompanyQuery] = useState(searchParams.get('companySearch') ?? '');
  const [hasDocuments, setHasDocuments] = useState(searchParams.get('hasDocuments') === 'true');
  const [hasNotes, setHasNotes] = useState(searchParams.get('hasNotes') === 'true');
  const [createdFrom, setCreatedFrom] = useState(searchParams.get('createdFrom') ?? '');
  const [createdTo, setCreatedTo] = useState(searchParams.get('createdTo') ?? '');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (params: Record<string, string | boolean | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set('page', '1');

      Object.entries(params).forEach(([key, value]) => {
        if (value === true) {
          next.set(key, 'true');
        } else if (value === false || value === '' || value === undefined) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      router.push(`${pathname}?${next.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleStatusChange = (value: SubmissionStatus | '') => {
    setStatus(value);
    updateUrl({ status: value });
  };

  const handleBrokerChange = (value: string) => {
    setBrokerId(value);
    updateUrl({ brokerId: value });
  };

  const handleCompanyChange = (value: string) => {
    setCompanyQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateUrl({ companySearch: value });
    }, 300);
  };

  const handleHasDocumentsChange = (value: boolean) => {
    setHasDocuments(value);
    updateUrl({ hasDocuments: value });
  };

  const handleHasNotesChange = (value: boolean) => {
    setHasNotes(value);
    updateUrl({ hasNotes: value });
  };

  const handleCreatedFromChange = (value: string) => {
    setCreatedFrom(value);
    updateUrl({ createdFrom: value });
  };

  const handleCreatedToChange = (value: string) => {
    setCreatedTo(value);
    updateUrl({ createdTo: value });
  };

  const handleClearAll = () => {
    router.push(pathname);
  };

  useEffect(() => {
    setStatus((searchParams.get('status') as SubmissionStatus) ?? '');
    setBrokerId(searchParams.get('brokerId') ?? '');
    setCompanyQuery(searchParams.get('companySearch') ?? '');
    setHasDocuments(searchParams.get('hasDocuments') === 'true');
    setHasNotes(searchParams.get('hasNotes') === 'true');
    setCreatedFrom(searchParams.get('createdFrom') ?? '');
    setCreatedTo(searchParams.get('createdTo') ?? '');
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const hasActiveFilters = searchParams.toString() !== '';

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          select
          label="Status"
          name="status"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as SubmissionStatus | '')}
          fullWidth
          size="small"
          id="filter-status"
          sx={{ maxWidth: { md: 200 } }}
        >
          {STATUS_OPTIONS.map((opt) => (
            <MenuItem key={opt.value || 'all'} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Broker"
          name="brokerId"
          value={brokerId}
          onChange={(e) => handleBrokerChange(e.target.value)}
          fullWidth
          size="small"
          id="filter-broker"
          sx={{ maxWidth: { md: 240 } }}
        >
          <MenuItem value="">All brokers</MenuItem>
          {brokers.map((broker) => (
            <MenuItem key={broker.id} value={String(broker.id)}>
              {broker.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Company search"
          name="companySearch"
          value={companyQuery}
          onChange={(e) => handleCompanyChange(e.target.value)}
          fullWidth
          size="small"
          placeholder="Search by company name…"
          id="filter-company-search"
        />
      </Stack>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'rgba(15, 98, 254, 0.03)',
          border: '1px dashed rgba(15, 98, 254, 0.2)',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center">
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasDocuments}
                  onChange={(e) => handleHasDocumentsChange(e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Has documents
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasNotes}
                  onChange={(e) => handleHasNotesChange(e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Has notes
                </Typography>
              }
            />
          </Stack>

          <Stack direction="row" spacing={2} flex={1}>
            <TextField
              type="date"
              label="Created from"
              value={createdFrom}
              onChange={(e) => handleCreatedFromChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              type="date"
              label="Created to"
              value={createdTo}
              onChange={(e) => handleCreatedToChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              sx={{ bgcolor: 'white' }}
            />
          </Stack>

          <Button
            size="small"
            startIcon={<FilterListOffIcon />}
            onClick={handleClearAll}
            disabled={!hasActiveFilters}
            sx={{
              fontWeight: 600,
            }}
          >
            Clear filters
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
