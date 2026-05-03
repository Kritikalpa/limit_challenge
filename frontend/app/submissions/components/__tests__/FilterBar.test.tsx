import { render, screen, fireEvent, act } from '@/lib/test-utils';
import { FilterBar } from '../FilterBar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockBrokers = [
  { id: 1, name: 'Broker A', primaryContactEmail: 'a@test.com' },
  { id: 2, name: 'Broker B', primaryContactEmail: 'b@test.com' },
];

describe('FilterBar', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (usePathname as jest.Mock).mockReturnValue('/submissions');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('renders initial state correctly from URL parameters', () => {
    const params = new URLSearchParams('status=new&companySearch=acme&hasDocuments=true');
    (useSearchParams as jest.Mock).mockReturnValue(params);

    render(<FilterBar brokers={mockBrokers} />);

    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByLabelText('Company search')).toHaveValue('acme');
    expect((screen.getByLabelText('Has documents') as HTMLInputElement).checked).toBe(true);
  });

  it('updates URL immediately when status is changed', async () => {
    render(<FilterBar brokers={mockBrokers} />);

    const statusSelect = screen.getByLabelText('Status');
    fireEvent.mouseDown(statusSelect);

    const lostOption = await screen.findByRole('option', { name: 'Lost' });
    fireEvent.click(lostOption);

    expect(push).toHaveBeenCalledWith('/submissions?page=1&status=lost');
  });

  it('updates URL immediately when broker is changed', async () => {
    render(<FilterBar brokers={mockBrokers} />);

    const brokerSelect = screen.getByLabelText('Broker');
    fireEvent.mouseDown(brokerSelect);

    const brokerOption = await screen.findByRole('option', { name: 'Broker A' });
    fireEvent.click(brokerOption);

    expect(push).toHaveBeenCalledWith('/submissions?page=1&brokerId=1');
  });

  it('updates URL with debounce when company search changes', async () => {
    jest.useFakeTimers();
    render(<FilterBar brokers={mockBrokers} />);

    const searchInput = screen.getByLabelText('Company search');
    fireEvent.change(searchInput, { target: { value: 'google' } });

    expect(push).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(push).toHaveBeenCalledWith('/submissions?page=1&companySearch=google');
    jest.useRealTimers();
  });

  it('updates URL when checkboxes are toggled', () => {
    render(<FilterBar brokers={mockBrokers} />);

    const notesCheckbox = screen.getByLabelText('Has notes');
    fireEvent.click(notesCheckbox);
    expect(push).toHaveBeenCalledWith('/submissions?page=1&hasNotes=true');

    fireEvent.click(notesCheckbox);
    expect(push).toHaveBeenCalledWith('/submissions?page=1');
  });

  it('updates URL when date range is changed', () => {
    render(<FilterBar brokers={mockBrokers} />);

    const fromInput = screen.getByLabelText('Created from');
    fireEvent.change(fromInput, { target: { value: '2023-01-01' } });

    expect(push).toHaveBeenCalledWith('/submissions?page=1&createdFrom=2023-01-01');
  });
});
