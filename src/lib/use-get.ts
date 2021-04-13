import { useCallback, useEffect, useState } from "react";

type Get = () => Promise<void>;

type Res<T> =
  | { data: T; error: null; loading: false; get: Get }
  | { data: null; error: null; loading: true; get: Get }
  | { data: null; error: string; loading: false; get: Get };

type Props = {
  path: string;
};

export const useGet = <T>({ path }: Props): Res<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const get = useCallback(async () => {
    setError(null);

    try {
      const res = await fetch("");
      if (!res.ok) throw new Error(res.statusText);
      const json = (await res.json()) as { data: T };
      setData(json.data);
    } catch (err) {
      setError(err);
    } finally {
    }
  }, []);

  useEffect(() => {
    get();
  }, [path]);

  if (data) return { data, error: null, loading: false, get };
  if (error) return { data: null, error: error, loading: false, get };
  return { data: null, error: null, loading: true, get };
};
