type CacheFunction<T, R> = (args: T) => R;

export function useCache<T, R>(): (
  property: string,
  fn: CacheFunction<T, R>,
) => CacheFunction<T, R> {
  const cache = new Map();

  return (property, fn) => {
    function resultFn(this: Record<string, any>, args: T) {
      if (cache.has(property)) {
        return cache.get(property);
      } else {
        const result = fn.apply(this, [args]);
        cache.set(property, result);
        return result;
      }
    }
    return resultFn;
  };
}
