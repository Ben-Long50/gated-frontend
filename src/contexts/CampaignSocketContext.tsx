import { createContext, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { socket } from '../socket';
import { useQueryClient } from '@tanstack/react-query';

const CampaignSocketContext = createContext({ socket });

export const CampaignSocketProvider = () => {
  const queryClient = useQueryClient();
  const { campaignId } = useParams();

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected to campaign`);
    });

    socket.on('character', (characterId) => {
      console.log(characterId);

      queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  return (
    <CampaignSocketContext.Provider value={{ socket }}>
      <Outlet />
    </CampaignSocketContext.Provider>
  );
};
