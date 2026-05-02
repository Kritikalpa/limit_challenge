import { Box, Card, CardContent, Divider, Skeleton, Stack } from '@mui/material';

function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton width={160} height={28} sx={{ mb: 1 }} />
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {Array.from({ length: rows }).map((_, i) => (
            <Box key={i} display="flex" gap={2}>
              <Skeleton width="25%" height={20} />
              <Skeleton width="20%" height={20} />
              <Skeleton width="30%" height={20} />
              <Skeleton width="15%" height={20} />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export function DetailSkeleton() {
  return (
    <Stack spacing={3}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Skeleton width={240} height={34} sx={{ mb: 1 }} />
                <Box display="flex" gap={1}>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={100} height={24} />
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <Skeleton width={80} height={30} />
                <Skeleton width={70} height={30} />
              </Box>
            </Box>
            <Divider />
            <Box display="flex" gap={4}>
              <Box>
                <Skeleton width={50} height={14} sx={{ mb: 0.5 }} />
                <Skeleton width={120} height={20} />
              </Box>
              <Box>
                <Skeleton width={50} height={14} sx={{ mb: 0.5 }} />
                <Skeleton width={120} height={20} />
              </Box>
            </Box>
            <Divider />
            <Skeleton width="100%" height={60} />
          </Stack>
        </CardContent>
      </Card>

      <SectionSkeleton rows={3} />
      <SectionSkeleton rows={2} />

      <Card variant="outlined">
        <CardContent>
          <Skeleton width={80} height={28} sx={{ mb: 1 }} />
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {[1, 2, 3].map((i) => (
              <Box key={i} display="flex" gap={2}>
                <Skeleton variant="circular" width={36} height={36} />
                <Box flex={1}>
                  <Skeleton width={150} height={18} sx={{ mb: 0.5 }} />
                  <Skeleton width="90%" height={60} />
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
