import { create, keyResolver, windowScheduler } from '@yornaath/batshit';
import handleResponse from '../handleResponse';

const getCharacter = create({
  fetcher: async (characterIds: number[]) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/characters/batch?ids=${characterIds.join(',')}`,
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

export default getCharacter;
