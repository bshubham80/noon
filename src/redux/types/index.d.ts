import store from '../store';

export interface Product {
	id: number;
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


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
