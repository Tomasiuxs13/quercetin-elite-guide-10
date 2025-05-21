
export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  imageAlt?: string;
  slug: string;
  description: string;
  details?: string;
  ingredients?: string;
  dosage?: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceRange?: string;
  link: string;
  rank?: number;
  pros?: string[];
  cons?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductClick {
  id: number;
  productId: number;
  clickedAt: Date;
  referrer?: string;
  userAgent?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}
