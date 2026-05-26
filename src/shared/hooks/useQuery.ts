import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

import { getStoreVersion, subscribe } from '@/services/mocks/inMemoryStore';

export function useStoreVersion(): number {
  return useSyncExternalStore(subscribe, getStoreVersion, () => 0);
}

export function useQuery<T>(fetcher: () => Promise<T>, deps: unknown[] = []): T | undefined {
  const version = useStoreVersion();
  const [data, setData] = useState<T | undefined>(undefined);

  const stableDeps = JSON.stringify(deps);

  useEffect(() => {
    let active = true;

    void fetcher().then((result) => {
      if (active) setData(result);
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, stableDeps]);

  return data;
}

export function useMutation<TArgs extends unknown[], TResult>(
  mutator: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  return useCallback((...args: TArgs) => mutator(...args), [mutator]);
}
