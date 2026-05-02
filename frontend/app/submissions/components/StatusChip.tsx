import { Chip, ChipProps } from '@mui/material';
import { SubmissionStatus } from '@/lib/types';

interface StatusChipProps {
  status: SubmissionStatus;
  size?: ChipProps['size'];
}

const STATUS_CONFIG: Record<
  SubmissionStatus,
  { label: string; bg: string; color: string }
> = {
  new: { label: 'New', bg: '#E3F2FD', color: '#0D47A1' },
  in_review: { label: 'In Review', bg: '#FFF8E1', color: '#B26500' },
  closed: { label: 'Closed', bg: '#E8F5E9', color: '#1B5E20' },
  lost: { label: 'Lost', bg: '#FFEBEE', color: '#B71C1C' },
};

export function StatusChip({ status, size = 'small' }: StatusChipProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, bg: '#f1f5f9', color: '#475569' };
  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        fontWeight: 600,
        textTransform: 'capitalize',
        letterSpacing: 0.2,
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}4D`,
      }}
    />
  );
}
