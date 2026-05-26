import type { UploadStatus } from '@/types/common';

export type MediaAsset = {
  id: string;
  ownerId: string;
  projectId?: string;
  title: string;
  description?: string;
  muxAssetId?: string;
  muxPlaybackId?: string;
  uploadStatus: UploadStatus;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: number;
};

export type ReelUploadProgress =
  | 'idle'
  | 'creating_upload'
  | 'uploading'
  | 'processing'
  | 'ready'
  | 'failed';

export type ReelUploadResult = {
  muxAssetId: string;
  muxPlaybackId: string;
  duration: number;
  uploadStatus: 'ready';
};
