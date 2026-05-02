import {
  Box,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { Contact } from '@/lib/types';

interface ContactsSectionProps {
  contacts: Contact[];
}

export function ContactsSection({ contacts }: ContactsSectionProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PeopleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h6" fontWeight={600}>
            Contacts
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            ({contacts.length})
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {contacts.length === 0 ? (
          <Typography variant="body2" color="text.secondary" fontStyle="italic" py={2} textAlign="center">
            No contacts on file for this submission.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Role
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {contact.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {contact.role || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {contact.email ? (
                      <Typography
                        component="a"
                        href={`mailto:${contact.email}`}
                        variant="body2"
                        color="primary.main"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {contact.email}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {contact.phone || '—'}
                    </Typography>
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
