import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Database Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  website?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  shortDescription?: string;
  fullDescription?: string;
  specifications?: any; // JSON
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  thumbnail?: string;
  weight?: number;
  dimensions?: any; // JSON
  warranty?: number;
  categoryId?: number;
  brandId?: number;
  totalStock: number;
  totalSold: number;
  viewCount: number;
  averageRating?: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  brand?: Brand;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  name: string;
  color?: string;
  colorHex?: string;
  storage?: string;
  memory?: string;
  size?: string;
  material?: string;
  attributes?: any; // JSON
  priceAdjust: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";
  role: "ADMIN" | "USER";
  isActive: boolean;
  emailVerifiedAt?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  title?: string;
  comment?: string;
  images?: any; // JSON
  isVerified: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Cart {
  id: number;
  userId: number;
  status: "ACTIVE" | "ABANDONED" | "CONVERTED";
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  variant?: ProductVariant;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED"
    | "REFUNDED";
  paymentStatus:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED";
  paymentMethod: string;
  shippingAddress?: any; // JSON
  billingAddress?: any; // JSON
  customerNotes?: string;
  adminNotes?: string;
  shippingTrackingCode?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  variantId?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productSnapshot?: any; // JSON
  product: Product;
  variant?: ProductVariant;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  linkUrl?: string;
  buttonText?: string;
  position:
    | "HOME_SLIDER"
    | "HOME_BANNER"
    | "CATEGORY_BANNER"
    | "PRODUCT_BANNER"
    | "SIDEBAR_BANNER";
  sortOrder: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface ProductFilter {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  storage?: string;
  rating?: number;
  inStock?: boolean;
  sortBy?: "price" | "name" | "rating" | "newest";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  search?: string;
}
