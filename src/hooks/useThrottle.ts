export type UseThrottleProps<T = "undefined"> = {
  fn: (args?: T) => void;
  timeout: number;
};

export function useThrottle<T>(): ({
  fn,
  timeout = 1000,
}: UseThrottleProps<T>) => (args: T) => void {
  let isThrottled: boolean = false;
  let currentArgs: T | null = null;

  return ({ fn, timeout }) => {
    function resultFn(this: Record<string, any>, args: T): void {
      if (isThrottled) {
        currentArgs = args;
        return;
      }

      fn.apply(this, [args]);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (currentArgs !== null) {
          resultFn.apply(this, [currentArgs]);
          currentArgs = null;
        }
      }, timeout);
    }

    return resultFn;
  };
}
