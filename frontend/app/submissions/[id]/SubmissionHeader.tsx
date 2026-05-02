import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { SubmissionDetail } from '@/lib/types';
import { StatusChip } from '../components/StatusChip';
import { PriorityChip } from '../components/PriorityChip';

interface SubmissionHeaderProps {
  submission: SubmissionDetail;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function SubmissionHeader({ submission }: SubmissionHeaderProps) {
  const { company, broker, owner, status, priority, summary, createdAt, updatedAt } = submission;

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap">
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <BusinessIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="h5" fontWeight={700} component="h2">
                  {company.legalName}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {company.industry && (
                  <Chip label={company.industry} size="small" sx={{ bgcolor: 'grey.100' }} />
                )}
                {company.headquartersCity && (
                  <Chip label={company.headquartersCity} size="small" variant="outlined" />
                )}
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} flexShrink={0}>
              <StatusChip status={status} size="medium" />
              <PriorityChip priority={priority} size="medium" />
            </Stack>
          </Box>

          <Divider />

          <Box display="flex" flexWrap="wrap" gap={4}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
                Broker
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5} mt={0.3}>
                <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" fontWeight={500}>
                  {broker.name}
                </Typography>
              </Box>
              {broker.primaryContactEmail && (
                <Typography variant="caption" color="text.secondary">
                  {broker.primaryContactEmail}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
                Owner
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5} mt={0.3}>
                <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" fontWeight={500}>
                  {owner.fullName}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {owner.email}
              </Typography>
            </Box>

            <Box ml="auto" textAlign="right">
              <Typography variant="caption" color="text.secondary" display="block">
                Created {formatDate(createdAt)}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Updated {formatDate(updatedAt)}
              </Typography>
            </Box>
          </Box>

          {summary && (
            <>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5} display="block" mb={0.5}>
                  Summary
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {summary}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
