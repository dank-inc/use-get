import { useCallback, useEffect, useState } from "react";

type Get = () => Promise<void>;

type Res<T> =
  // Data | Error | Loading | Get
  [T, null, false, Get] | [null, null, true, Get] | [null, string, false, Get];

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

  if (data) return [data, null, false, get];
  if (error) return [null, error, false, get];
  return [null, null, true, get];
};
