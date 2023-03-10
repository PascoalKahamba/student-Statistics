import { useState, useEffect, Dispatch, SetStateAction } from "react";

type PersistedProps<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedStorage<T>(
  key: string,
  initialState: T
): PersistedProps<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) return JSON.parse(storageValue) as T;
    else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default usePersistedStorage;
