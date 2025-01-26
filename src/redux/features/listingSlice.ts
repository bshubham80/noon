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
			action.payload.reduce((acc, cur) => {
				if (cur.isBanner) {
					acc.banners.push(cur);
				} else if (cur.isFeatured) {
					acc.featured.push(cur);
				}
				return acc;
			}, state);
		});
	},
});

export default listingSlice.reducer;
