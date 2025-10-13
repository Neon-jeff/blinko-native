import { io, Socket } from 'socket.io-client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '~/store/auth';
import { env } from '~/env';

const SocketContext = createContext<Socket | null>(null);
const SOCKET_URL = env.SOCKET_URL;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const { user } = useAuthStore();
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`${SOCKET_URL}?token=${user?.tokens?.accessToken}`);
    }
  }, [user?.tokens?.accessToken]);

  socket.current?.on('connect', () => {
    console.log('Socket connected');
  });
  socket.current?.on('connect_error', (err) => {
    console.log('Socket connection error:', err.message);
  });

  return <SocketContext.Provider value={socket.current}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
