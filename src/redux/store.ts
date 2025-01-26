import { configureStore } from '@reduxjs/toolkit';
import listing from './features/listingSlice';
import { productsApi } from './api/productsApi';
import cart from './features/cartSlice';

export default configureStore({
	reducer: {
		listing,
		cart,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
		productsApi.middleware,
	]),
});
