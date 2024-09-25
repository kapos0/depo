import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice.js";

export const store = configureStore({
	reducer: {
		data: dataReducer,
	},
});
