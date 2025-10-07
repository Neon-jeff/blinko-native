import { useMutation } from '@tanstack/react-query';
import { MediaStoreService } from '~/services/media-store';

const mediaStoreService = () => new MediaStoreService();

export function useMediaUpload() {
  return useMutation({
    mutationFn: async (fileUri: string) => mediaStoreService().uploadMedia(fileUri),
  });
}
