import { useEffect, useState } from "react";

export const useSleep = (timeMs: number) => {
  const [isSleep, setIsSleep] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => setIsSleep(false), timeMs);

    return () => {
      clearTimeout(timerId);
    };
  }, [timeMs]);

  return isSleep;
};
