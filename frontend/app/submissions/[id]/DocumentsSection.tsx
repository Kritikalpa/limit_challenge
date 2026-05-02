import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Document } from '@/lib/types';

interface DocumentsSectionProps {
  documents: Document[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ArticleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h6" fontWeight={600}>
            Documents
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            ({documents.length})
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {documents.length === 0 ? (
          <Typography variant="body2" color="text.secondary" fontStyle="italic" py={2} textAlign="center">
            No documents attached to this submission.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Type
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Uploaded
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {doc.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={doc.docType} size="small" sx={{ bgcolor: 'grey.100', fontSize: 11 }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(doc.uploadedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {doc.fileUrl ? (
                      <Link
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, fontSize: 13 }}
                      >
                        View <OpenInNewIcon sx={{ fontSize: 13 }} />
                      </Link>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
