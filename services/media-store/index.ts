import { upload } from 'cloudinary-react-native';
import { Cloudinary } from '@cloudinary/url-gen';
import { env } from '~/env';

export class MediaStoreService {
  private storage = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY
    },
    url: {
      secure: true,
    },
  });

  async uploadMedia(fileUri: string): Promise<{ url: string; cloudinary_id: string } | null> {
    let response: { url: string; cloudinary_id: string } | null = null;
    try {
      await upload(this.storage, {
        file: fileUri,
        options: {
          upload_preset: 'default',
          resource_type: 'auto',
          unsigned: true,
        },
        callback: (error, result) => {
          if (error?.message) {
            console.error('Upload Error:', error);
            throw new Error(error.message);
          }
          const url = result?.secure_url;
          const id = result?.public_id
          if (!url) {
            throw new Error('Failed to upload media');
          }
          response = {
            url,
            cloudinary_id: id || '',
          }
        },
      })
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to upload media');
    }
  }
}
