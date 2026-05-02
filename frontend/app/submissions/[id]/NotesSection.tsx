import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import { NoteDetail } from '@/lib/types';

interface NotesSectionProps {
  notes: NoteDetail[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 42%)`;
}

function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function NoteCard({ note, isLast }: { note: NoteDetail; isLast: boolean }) {
  const color = stringToColor(note.authorName);

  return (
    <Box display="flex" gap={2} sx={{ position: 'relative' }}>
      {!isLast && (
        <Box
          sx={{
            position: 'absolute',
            left: 18,
            top: 36,
            bottom: -24, // Reach down to next avatar
            width: 2,
            bgcolor: 'divider',
            zIndex: 0,
          }}
        />
      )}
      
      <Avatar
        sx={{
          bgcolor: color,
          width: 36,
          height: 36,
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0,
          border: '2px solid white',
          boxShadow: '0 0 0 1px #e2e8f0',
          zIndex: 1,
        }}
      >
        {getInitials(note.authorName)}
      </Avatar>

      <Box flex={1} pb={isLast ? 0 : 3}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <Typography variant="body2" fontWeight={700}>
            {note.authorName}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            •
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatRelativeDate(note.createdAt)}
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0 12px 12px 12px',
          }}
        >
          <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {note.body}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export function NotesSection({ notes }: NotesSectionProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <NoteIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h6" fontWeight={600}>
            Notes
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            ({notes.length})
          </Typography>
        </Box>

        {notes.length === 0 ? (
          <Typography variant="body2" color="text.secondary" fontStyle="italic" py={2} textAlign="center">
            No notes yet on this submission.
          </Typography>
        ) : (
          <Stack spacing={0}>
            {notes.map((note, idx) => (
              <NoteCard key={note.id} note={note} isLast={idx === notes.length - 1} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
