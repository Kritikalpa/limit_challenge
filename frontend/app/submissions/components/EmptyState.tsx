import { Alert, Box, Button, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyStateProps {
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      gap={2}
      color="text.secondary"
    >
      <InboxIcon sx={{ fontSize: 56, opacity: 0.35 }} />
      <Typography variant="h6" color="text.secondary">
        {hasFilters ? 'No submissions match your filters' : 'No submissions yet'}
      </Typography>
      {hasFilters && onClearFilters && (
        <Button variant="outlined" size="small" onClick={onClearFilters}>
          Clear all filters
        </Button>
      )}
    </Box>
  );
}

interface ErrorStateProps {
  onRetry?: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        )
      }
    >
      Failed to load submissions. Please check your connection and try again.
    </Alert>
  );
}
