import { delay, mockNetworkDelay } from '@/services/mocks/mockDelay';
import { inMemoryStore } from '@/services/mocks/inMemoryStore';
import type { ReelUploadProgress, ReelUploadResult } from '@/types/media';

export const mediaService = {
  async uploadMediaMock(
    input: { title: string; projectId?: string },
    onProgress?: (status: ReelUploadProgress, progress: number) => void,
  ): Promise<ReelUploadResult> {
    await mockNetworkDelay(200, 300);

    const mediaId = inMemoryStore.createMediaAsset({
      title: input.title,
      projectId: input.projectId,
      uploadStatus: 'uploading',
    });

    onProgress?.('uploading', 0.3);
    await delay(700);

    onProgress?.('processing', 0.7);
    await delay(600);

    const result: ReelUploadResult = {
      muxAssetId: `mock-asset-${Date.now()}`,
      muxPlaybackId: `mock-playback-${Date.now()}`,
      duration: 90,
      uploadStatus: 'ready',
    };

    inMemoryStore.updateMediaAsset(mediaId, {
      uploadStatus: 'ready',
      muxAssetId: result.muxAssetId,
      muxPlaybackId: result.muxPlaybackId,
      duration: result.duration,
    });

    onProgress?.('ready', 1);
    return result;
  },
};
