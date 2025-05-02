export interface NavItem {
  name: string;
  path: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  before: string;
  after: string;
  theme: string;
}

export interface UploadedImage {
  file: File | null;
  preview: string | null;
}