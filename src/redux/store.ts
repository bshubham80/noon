import { configureStore } from '@reduxjs/toolkit';
import listing from './features/listingSlice';
import { productsApi } from './api/productsApi';

export default configureStore({
	reducer: {
		listing,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
		productsApi.middleware,
	]),
});
