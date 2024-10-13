import { configureStore } from "@reduxjs/toolkit";
import photoGalleryReducer from "./photoGallerySlice";

export const store = configureStore({
  reducer: {
    photoGallery: photoGalleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
