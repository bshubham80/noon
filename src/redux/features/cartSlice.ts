import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from '../types';

const initialState: CartSliceState = {
	totalQuantity: 0,
	items: [],
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Pick<CartItem, 'product'>>) => {
			const { product } = action.payload;
			const existingItem = state.items.find(item => item.product.id === product.id);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			state.totalQuantity++;
			state.totalPrice += product.price;
		},
		removeFromCart: (state, action: PayloadAction<Pick<CartItem, 'product'>>) => {
			const { product } = action.payload;

			const existingItem = state.items.find(item => item.product.id === product.id);
			if (existingItem && existingItem.quantity > 1) {
				existingItem.quantity--;
			} else {
				state.items = state.items.filter(item => item.product.id !== product.id);
			}
			state.totalQuantity--;
			state.totalPrice -= product.price;
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
