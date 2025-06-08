import { create, keyResolver, windowScheduler } from '@yornaath/batshit';
import handleResponse from '../handleResponse';

const getItemById = create({
  fetcher: async (itemIds: number[]) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/items/batch?ids=${itemIds.join(',')}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);

    return data;
  },
  resolver: keyResolver('id'),
  scheduler: windowScheduler(10),
});

export default getItemById;
