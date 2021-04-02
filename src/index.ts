import { useCallback, useEffect, useState } from "react";

type Fetch = () => Promise<void>;

type Res<T> =
  | [T, null, false, Fetch]
  | [null, null, true, Fetch]
  | [null, string, false, Fetch];

type Props = {
  path: string;
};

export const useGet = <T>({ path }: Props): Res<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const get = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("");
      if (!res.ok) throw new Error(res.statusText);
      const json = (await res.json()) as { data: T };
      setData(json.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    get();
  }, [path]);

  if (data) return [data, null, false, get];
  if (error) return [null, error, false, get];
  return [null, null, true, get];
};
