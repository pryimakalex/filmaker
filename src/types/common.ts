export type UploadStatus = 'pending' | 'uploading' | 'processing' | 'ready' | 'failed';

export type SocialLinks = {
  instagram?: string;
  vimeo?: string;
  imdb?: string;
  linkedin?: string;
};

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
};
