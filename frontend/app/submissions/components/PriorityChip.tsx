import { Chip, ChipProps } from '@mui/material';
import { SubmissionPriority } from '@/lib/types';

interface PriorityChipProps {
  priority: SubmissionPriority;
  size?: ChipProps['size'];
}

const PRIORITY_CONFIG: Record<SubmissionPriority, {
  label: string; sx: {
    bgcolor: string
    color: string
    fontWeight: number
  }
}> = {
  high: { label: 'High', sx: { bgcolor: '#fde8e8', color: '#b91c1c', fontWeight: 600 } },
  medium: { label: 'Medium', sx: { bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 } },
  low: { label: 'Low', sx: { bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 } },
};

export function PriorityChip({ priority, size = 'small' }: PriorityChipProps) {
  const config = PRIORITY_CONFIG[priority] ?? {
    label: priority,
    sx: { bgcolor: '#f1f5f9', color: '#475569' },
  };
  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        textTransform: 'capitalize',
        letterSpacing: 0.2,
        border: `1px solid ${config.sx.color}4D`,
        ...config.sx,
      }}
    />
  );
}
