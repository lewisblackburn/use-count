import { useCallback, useEffect, useState } from 'react';

import { Count } from '../types/count';

/**
 * Use Count
 * @param initialNamespace The initial namespace value. The namespace should be unique, so it's recommended to use your site's domain. Inside each namespace, you can generate all the counters you may need.
 * @param initialKey The initial key value. The hit endpoint provides increment by one counters directly. Each time it's requested, the counter will increase by one.
 */
export function useCount(
  initialNamespace: string,
  initialKey: string,
): {
  data?: Count;
  error?: Error;
  loading?: boolean;
  refetch: (namespace: string, key: string) => void;
} {
  const [data, setData] = useState<Count | undefined>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [namespace, setNamespace] = useState<string>(initialNamespace);
  const [key, setKey] = useState<string>(initialKey);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (refetchFlag) console.log('refetching count');
    setIsLoading(true);
    const endpoint = `https://cohq.deno.dev/${namespace}-${key}`;
    try {
      setData(undefined); // Clear the previous data
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch count');
      }
      const newData = await response.json();
      setData(newData); // Set the new data
    } catch (error) {
      // @ts-expect-error: TODO: Fix error type
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [namespace, key, refetchFlag]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback((newNamespace: string, newKey: string) => {
    setNamespace(newNamespace);
    setKey(newKey);
    setRefetchFlag((prevFlag) => !prevFlag); // Update the refetchFlag to trigger the effect
  }, []);

  return { data, error, loading: isLoading, refetch };
}
