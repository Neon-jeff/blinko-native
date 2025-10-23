import { io, Socket } from 'socket.io-client';
import React, { useEffect, useRef,} from 'react';
import { useAuthStore } from '~/store/auth';
import { env } from '~/env';

const SOCKET_URL = env.SOCKET_URL;
export function useSocket() {
  const socket = useRef<Socket | null>(null);
  const { user, rehydrated } = useAuthStore();
  useEffect(() => {
    if (!socket.current && rehydrated) {
      socket.current = io(`${SOCKET_URL}?token=${user?.tokens?.accessToken}`);
    }
  }, [rehydrated]);
}
