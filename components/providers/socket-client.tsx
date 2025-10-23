import { io, Socket } from 'socket.io-client';
import React, { createContext, useContext, useEffect, useRef} from 'react';
import { useAuthStore } from '~/store/auth';
import { env } from '~/env';

const SocketContext = createContext<Socket | null>(null);
const SOCKET_URL = env.SOCKET_URL;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const { user, rehydrated } = useAuthStore();
  const connectionSuccessful = useRef(false);

  useEffect(() => {
    if (rehydrated && user?.tokens?.accessToken && !connectionSuccessful.current) {
      socketRef.current = io(`${SOCKET_URL}?token=${user?.tokens?.accessToken}`);
      connectionSuccessful.current = true;
      socketRef.current.on('connect', () => {
        console.log('Socket connected:', socketRef.current?.id);
      });

      socketRef.current.on('connect_error', (err) => {
        console.log('Socket connection error:', err.message);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      connectionSuccessful.current = false;
    };
  }, [rehydrated, user?.tokens?.accessToken]);

  return <SocketContext.Provider value={socketRef.current}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
