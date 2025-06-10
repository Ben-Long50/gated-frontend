import { create, keyResolver, windowScheduler } from '@yornaath/batshit';
import handleResponse from '../handleResponse';

const getAffiliation = create({
  fetcher: async (affiliationIds: number[]) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/affiliations/batch?ids=${affiliationIds.join(',')}`,
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

export default getAffiliation;
