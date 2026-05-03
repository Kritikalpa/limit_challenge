import { render, screen, fireEvent } from '@/lib/test-utils';
import { SubmissionTable } from '../SubmissionTable';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockSubmissions = [
  {
    id: 1,
    status: 'new',
    priority: 'high',
    company: { legalName: 'Test Company', industry: 'Software' },
    broker: { name: 'Test Broker' },
    owner: { fullName: 'Test Owner' },
    documentCount: 2,
    noteCount: 1,
    latestNote: { bodyPreview: 'Test Note', authorName: 'Tester' },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    summary: 'Test Summary',
  },
];

describe('SubmissionTable', () => {
  it('renders table headers', () => {
    render(<SubmissionTable submissions={[]} />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Broker')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
  });

  it('renders submission data correctly', () => {
    render(<SubmissionTable submissions={mockSubmissions as any} />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('Test Broker')).toBeInTheDocument();
    expect(screen.getByText('Test Owner')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('navigates to detail page when a row is clicked', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<SubmissionTable submissions={mockSubmissions as any} />);

    const companyCell = screen.getByText('Test Company');
    fireEvent.click(companyCell);

    expect(push).toHaveBeenCalledWith('/submissions/1');
  });

  it('renders "No notes yet" when latestNote is null', () => {
    const submissionWithoutNote = [{ ...mockSubmissions[0], latestNote: null }];
    render(<SubmissionTable submissions={submissionWithoutNote as any} />);
    expect(screen.getByText('No notes yet')).toBeInTheDocument();
  });
});
