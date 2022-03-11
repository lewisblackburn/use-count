import useSWR from 'swr';
import { Count } from './types';

/**
 * Use CountAPI.xyz
 * @param namespace The namespace should be unique, so its recommend using your site's domain. Inside each namespace you can generate all the counters you may need.
 * @param key The hit endpoint provides increment by one counters directly. Each time its requested the counter will increase by one.
 */
export function useCount(namespace: string, key: string): Count {
  const endpoint = `https://api.countapi.xyz/hit/${namespace}/${key}`;

  const { data: value } = useSWR<Count>(endpoint);

  if (value === undefined) return { value: 0 };

  return value;
}

export * from './types';
