import { io } from 'socket.io-client';

const isMobile = window.location.href.includes('192.168.4.148');

const apiUrl = isMobile
  ? import.meta.env.VITE_LOCAL_BACKEND_URL
  : import.meta.env.VITE_API_URL;

const URL = apiUrl || 'http://localhost:3000';

export const socket = io(URL, {
  autoConnect: false, // Important: you control when it connects manually
  transports: ['websocket'], // Use WebSocket first
});
