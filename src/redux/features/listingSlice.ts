import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';
import { ListingSliceState } from '../types';

const initialState: ListingSliceState = {
	banners: [],
	featured: [],
};

export const listingSlice = createSlice({
	name: 'listing',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, action) => {
			state.banners = action.payload.filter(i => i.isBanner);
			state.featured = action.payload.filter(i => i.isFeature);
		});
	},
});

export default listingSlice.reducer;
