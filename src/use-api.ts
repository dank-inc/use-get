import { useCallback, useEffect, useState } from "react";
import { Response } from "./types";

type Get = () => Promise<void>;

type Res<T> =
  // Data | Error | Loading | Get
  [T, null, false, Get] | [null, null, true, Get] | [null, string, false, Get];

type Props<T> = {
  endpointFn: () => Promise<Response<T>>;
};

export const useApi = <T>({ endpointFn }: Props<T>): Res<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async () => {
    setError(null);

    try {
      const res = await endpointFn();
      if (res.status === 200) {
        setData(res.data);
        return;
      }
      throw new Error(res.statusText);
    } catch (err) {
      setError(err);
    } finally {
    }
  }, []);

  useEffect(() => {
    get();
  }, [endpointFn]);

  if (data) return [data, null, false, get];
  if (error) return [null, error, false, get];
  return [null, null, true, get];
};
