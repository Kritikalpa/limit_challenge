import { render, screen } from '@/lib/test-utils';
import { PriorityChip } from '../PriorityChip';

describe('PriorityChip', () => {
  it('renders "High" priority correctly', () => {
    render(<PriorityChip priority="high" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders "Medium" priority correctly', () => {
    render(<PriorityChip priority="medium" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders "Low" priority correctly', () => {
    render(<PriorityChip priority="low" />);
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('renders fallback for unknown priority', () => {
    // @ts-expect-error
    render(<PriorityChip priority="unknown" />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });
});
