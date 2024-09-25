import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: [],
	keyword: "",
};

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		createProduct: (state, action) => {
			state.data.push(action.payload);
		},
		editProduct: (state, action) => {
			state.data.forEach((product, index) => {
				if (product.id === action.payload.id) {
					state.data[index] = action.payload;
				}
			});
		},
		deleteProduct: (state, action) => {
			state.data = state.data.filter(
				(product) => product.id !== action.payload
			);
		},
		findData: (state, action) => {
			state.keyword = action.payload.toLowerCase();
		},

		sortData: (state, action) => {
			state.data.sort((a, b) => {
				if (action.payload === "asc") {
					return a.price - b.price;
				} else if (action.payload === "desc") {
					return b.price - a.price;
				} else {
					null;
				}
			});
		},
	},
});

export const { createProduct, editProduct, deleteProduct, findData, sortData } =
	dataSlice.actions;

export default dataSlice.reducer;
