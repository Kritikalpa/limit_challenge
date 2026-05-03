import { render, screen, waitFor } from '@/lib/test-utils';
import SubmissionDetailPage from '../page';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('SubmissionDetailPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the detail skeleton initially', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    render(<SubmissionDetailPage />);

    expect(screen.getByText(/Back to submissions/i)).toBeInTheDocument();
  });

  it('loads and displays the submission details', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    render(<SubmissionDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Test summary')).toBeInTheDocument();
    expect(screen.getByText('Broker A')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /contacts/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /documents/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /notes/i })).toBeInTheDocument();
  });

  it('displays an error message if the API fails', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });
  });
});
