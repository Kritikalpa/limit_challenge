import { render, screen, waitFor } from '@/lib/test-utils';
import SubmissionsPage from '../page';
import { useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/submissions'),
  useSearchParams: jest.fn(),
}));

describe('SubmissionsPage Integration', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('renders the page title and initial loading state', () => {
    render(<SubmissionsPage />);
    expect(screen.getByText('Submissions')).toBeInTheDocument();
    expect(screen.getByText('Browse and filter incoming broker submissions.')).toBeInTheDocument();
  });

  it('fetches and displays submissions from the mock API', async () => {
    render(<SubmissionsPage />);

    await waitFor(() => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Broker A')).toBeInTheDocument();
    expect(screen.getByText('Owner A')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('displays the correct results count', async () => {
    render(<SubmissionsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Showing 1–1 of 1 submissions/)).toBeInTheDocument();
    });
  });
});
