import { useCallback, useEffect, useState } from "react";
import { Response } from "./types";

// TODO: Objects
type Res<T> =
  | { data: T; error: null; loading: false }
  | { data: null; error: null; loading: true }
  | { data: null; error: string; loading: false };

type Props<T> = {
  endpointFn: () => Promise<Response<T>>;
};

export const usePromise = <T>(promise: Promise<T>): Res<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async () => {
    setError(null);

    try {
      const data = await promise;
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
    }
  }, []);

  useEffect(() => {
    get();
  }, [promise]);

  if (data) return { data, error: null, loading: false };
  if (error) return { data: null, error, loading: false };
  return { data: null, error: null, loading: true };
};
