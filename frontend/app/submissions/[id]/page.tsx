'use client';

import {
  Alert,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';
import { SubmissionHeader } from './SubmissionHeader';
import { ContactsSection } from './ContactsSection';
import { DocumentsSection } from './DocumentsSection';
import { NotesSection } from './NotesSection';
import { DetailSkeleton } from './DetailSkeleton';

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';

  const { data, isPending, isError, refetch } = useSubmissionDetail(submissionId);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <MuiLink
            component={Link}
            href="/submissions"
            underline="hover"
            color="text.secondary"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: 14 }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Back to submissions
          </MuiLink>
        </Box>

        {isPending && <DetailSkeleton />}

        {isError && (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                Retry
              </Button>
            }
          >
            Failed to load submission #{submissionId}. Please try again.
          </Alert>
        )}

        {data && (
          <>
            <SubmissionHeader submission={data} />
            <ContactsSection contacts={data.contacts} />
            <DocumentsSection documents={data.documents} />
            <NotesSection notes={data.notes} />
          </>
        )}
      </Stack>
    </Container>
  );
}
