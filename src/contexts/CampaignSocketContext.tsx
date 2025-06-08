import { createContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { socket } from '../socket';
import { useQueryClient } from '@tanstack/react-query';

const CampaignSocketContext = createContext({ socket });

export const CampaignSocketProvider = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected to campaign`);
    });

    socket.on('character', (characterId) => {
      queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    });

    socket.on('item', (itemId) => {
      queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    });

    socket.on('affiliation', (affiliationId) => {
      queryClient.invalidateQueries({
        queryKey: ['affiliation', affiliationId],
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
