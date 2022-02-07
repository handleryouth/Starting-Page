import { SetStateAction } from "react";

export interface QuotesResponse {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
}

export interface ImageProperties {
  id: string;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface ImageResponse {
  total: number;
  totalHits: number;
  hits: ImageProperties[];
}

export interface RequestImageBody {
  category:
    | "backgrounds"
    | "fashion"
    | "nature"
    | " science"
    | "education"
    | "feelings"
    | "health"
    | "people"
    | "religion"
    | "places"
    | "animals"
    | "industry"
    | "computer"
    | "food"
    | "sports"
    | "transportation"
    | "travel"
    | "buildings"
    | "business"
    | "music";
  color:
    | "grayscale"
    | "transparent"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "blue"
    | "lilac"
    | "pink"
    | "white"
    | "gray"
    | "black"
    | "brown";
}

export interface SearchTemplate {
  search: string;
}

export interface DetailChildrenProps {
  title: string;
  value: string | number;
}

export interface DetailProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  date: Date;
}
