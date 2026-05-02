import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const COLUMNS = 8;

export function SubmissionListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {Array.from({ length: COLUMNS }).map((_, i) => (
            <TableCell key={i}>
              <Skeleton width="70%" height={20} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {Array.from({ length: COLUMNS }).map((_, colIdx) => (
              <TableCell key={colIdx}>
                <Skeleton
                  width={colIdx === 0 ? '80%' : colIdx === COLUMNS - 1 ? '60%' : '50%'}
                  height={20}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
