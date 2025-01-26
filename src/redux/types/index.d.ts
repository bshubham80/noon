import store from '../store';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: Array<string>;
  description: string;
  category: string;
  isBanner: boolean;
  isFeature: boolean;
}

export interface ListingSliceState {
  banners: Array<Product>;
  featured: Array<Product>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSliceState {
  totalQuantity: number;
  items: Array<CartItem>;
  totalPrice: number;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
