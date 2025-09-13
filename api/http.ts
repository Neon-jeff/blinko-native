import { useAuthStore } from '@/store/auth';
import { router } from 'expo-router';
import ky, { HTTPError } from 'ky';
import { toast } from 'sonner-native';
import { env } from '~/env';
import { UserState } from '~/store/auth/types';
import { local_store } from '~/store/local-store';

export const http = ky.extend({
  prefixUrl: env.API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const store = JSON.parse(
          local_store.getString('user-storage') || 'null'
        ) as UserState | null;
        if (store && store.user && store.user.tokens) {
          request.headers.set('Authorization', `Bearer ${store.user.tokens.accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (_input, _option, response) => {
        if (response.status == 401) {
          useAuthStore.getState().logout();
          router.replace('/login');
          toast.error('Session expired, please log in again');
          return;
        }
        if (!response.ok) {
          throw new HTTPError(response, _input, _option);
        }
        return response;
      },
    ],
  },
});
