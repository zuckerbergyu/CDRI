export interface SearchOptions {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
  target?: string;
}
export interface Documents {
  title?: string;
  isbn?: number;
  url?: string;
  contents?: string;
  authors?: string;
  thumbnail?: string;
  price?: number;
  sale_price?: number;
}
