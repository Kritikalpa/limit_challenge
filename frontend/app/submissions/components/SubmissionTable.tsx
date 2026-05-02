import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import NoteIcon from '@mui/icons-material/Note';
import { useRouter } from 'next/navigation';
import { SubmissionListItem } from '@/lib/types';
import { StatusChip } from './StatusChip';
import { PriorityChip } from './PriorityChip';

interface SubmissionTableProps {
  submissions: SubmissionListItem[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function SubmissionTable({ submissions }: SubmissionTableProps) {
  const router = useRouter();

  return (
    <Table size="small" sx={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow sx={{ bgcolor: 'grey.50' }}>
          <TableCell sx={{ width: '22%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Company
          </TableCell>
          <TableCell sx={{ width: '15%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Broker
          </TableCell>
          <TableCell sx={{ width: '11%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Status
          </TableCell>
          <TableCell sx={{ width: '10%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Priority
          </TableCell>
          <TableCell sx={{ width: '12%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Owner
          </TableCell>
          <TableCell sx={{ width: '8%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Docs / Notes
          </TableCell>
          <TableCell sx={{ width: '14%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Latest note
          </TableCell>
          <TableCell sx={{ width: '8%', fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Created
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {submissions.map((row) => (
          <TableRow
            key={row.id}
            hover
            onClick={() => router.push(`/submissions/${row.id}`)}
            sx={{
              cursor: 'pointer',
              '&:last-child td': { border: 0 },
              transition: 'background-color 0.15s ease-in-out',
            }}
          >
            <TableCell sx={{ py: 2.5 }}>
              <Typography variant="body2" fontWeight={600} color="text.primary" noWrap>
                {row.company.legalName}
              </Typography>
              {row.company.industry && (
                <Typography variant="caption" color="text.secondary" noWrap>
                  {row.company.industry}
                </Typography>
              )}
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                {row.broker.name}
              </Typography>
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              <StatusChip status={row.status} />
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              <PriorityChip priority={row.priority} />
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                {row.owner.fullName}
              </Typography>
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Tooltip title={`${row.documentCount} document${row.documentCount !== 1 ? 's' : ''}`}>
                  <Box display="flex" alignItems="center" gap={0.4} color={row.documentCount ? 'primary.main' : 'text.disabled'}>
                    <ArticleIcon sx={{ fontSize: 15 }} />
                    <Typography variant="caption" fontWeight={600}>{row.documentCount}</Typography>
                  </Box>
                </Tooltip>
                <Tooltip title={`${row.noteCount} note${row.noteCount !== 1 ? 's' : ''}`}>
                  <Box display="flex" alignItems="center" gap={0.4} color={row.noteCount ? 'secondary.main' : 'text.disabled'}>
                    <NoteIcon sx={{ fontSize: 15 }} />
                    <Typography variant="caption" fontWeight={600}>{row.noteCount}</Typography>
                  </Box>
                </Tooltip>
              </Stack>
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              {row.latestNote ? (
                <Tooltip title={row.latestNote.bodyPreview} placement="top-start">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      maxWidth: 200,
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                    }}
                  >
                    &ldquo;{row.latestNote.bodyPreview}&rdquo;
                    <Box component="span" sx={{ display: 'block', mt: 0.25, fontWeight: 500, fontSize: '0.65rem' }}>
                      &mdash; {row.latestNote.authorName}
                    </Box>
                  </Typography>
                </Tooltip>
              ) : (
                <Typography variant="caption" color="text.disabled">
                  No notes yet
                </Typography>
              )}
            </TableCell>
            <TableCell sx={{ py: 2.5 }}>
              <Typography variant="caption" color="text.secondary" noWrap>
                {formatDate(row.createdAt)}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
