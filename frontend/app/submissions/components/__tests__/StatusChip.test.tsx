import { render, screen } from '@/lib/test-utils';
import { StatusChip } from '../StatusChip';

describe('StatusChip', () => {
  it('renders "New" status correctly', () => {
    render(<StatusChip status="new" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders "In Review" status correctly', () => {
    render(<StatusChip status="in_review" />);
    expect(screen.getByText('In Review')).toBeInTheDocument();
  });

  it('renders "Closed" status correctly', () => {
    render(<StatusChip status="closed" />);
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('renders "Lost" status correctly', () => {
    render(<StatusChip status="lost" />);
    expect(screen.getByText('Lost')).toBeInTheDocument();
  });

  it('renders fallback for unknown status', () => {
    // @ts-expect-error
    render(<StatusChip status="unknown" />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });
});
