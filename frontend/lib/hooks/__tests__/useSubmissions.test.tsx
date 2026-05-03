import { renderHook, waitFor, Wrapper } from '@/lib/test-utils';
import { useSubmissionsList, useSubmissionDetail } from '../useSubmissions';

describe('useSubmissions hooks', () => {
  it('useSubmissionsList fetches and returns paginated data', async () => {
    const { result } = renderHook(() => useSubmissionsList({}), { wrapper: Wrapper });

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 3000 });

    expect(result.current.data?.results).toHaveLength(1);
    expect(result.current.data?.results[0].company.legalName).toBe('Acme Corp');
    expect(result.current.data?.results[0].status).toBe('new');
  });

  it('useSubmissionDetail fetches and returns a single submission', async () => {
    const { result } = renderHook(() => useSubmissionDetail(1), { wrapper: Wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 3000 });

    expect(result.current.data?.id).toBe(1);
    expect(result.current.data?.company.legalName).toBe('Acme Corp');
    expect(result.current.data?.summary).toBe('Test summary');
  });

  it('useSubmissionDetail does not fetch if id is missing', () => {
    const { result } = renderHook(() => useSubmissionDetail(''), { wrapper: Wrapper });
    expect(result.current.fetchStatus).toBe('idle');
  });
});
