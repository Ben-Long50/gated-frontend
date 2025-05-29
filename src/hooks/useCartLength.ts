import { useQueryClient } from '@tanstack/react-query';
import { useSyncExternalStore, useMemo } from 'react';

function useCartLength() {
  const queryClient = useQueryClient();

  const subscribe = (callback: () => void) => {
    return queryClient.getQueryCache().subscribe((event) => {
      if (event.query.queryKey[0] === 'activeCharacter') {
        callback();
      }
    });
  };

  const getSnapshot = () => {
    const cart = queryClient.getQueryData(['activeCharacter']);
    return cart;
  };

  const cart = useSyncExternalStore(subscribe, getSnapshot);

  // calculate length
  const cartLength = useMemo(() => {
    return Object.values(cart?.characterCart || {})
      .filter(Array.isArray)
      .flat()
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return cartLength;
}

export default useCartLength;
