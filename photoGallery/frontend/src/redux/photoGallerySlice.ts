import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type PhotoItem = {
  _id?: string;
  title: string;
  image: string;
  price: number;
};

export const fetchPhotoGallery = createAsyncThunk("fetchGallery", async () => {
  const response = await fetch("http://localhost:8000/api/gallery");
  const { data } = await response.json();
  return data;
});

export const addPhoto = createAsyncThunk(
  "addPhoto",
  async (photo: PhotoItem) => {
    const response = await fetch("http://localhost:8000/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });
    const data = await response.json();
    if (data.success) {
      return { data };
    } else {
      throw new Error("Failed to add photo");
    }
  }
);

export const updatePhoto = createAsyncThunk(
  "updatePhoto",
  async (photo: PhotoItem) => {
    if (!photo._id) return;
    const response = await fetch(
      `http://localhost:8000/api/gallery/${photo._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      }
    );
    const data = await response.json();
    if (data.success) {
      return { data };
    } else {
      throw new Error("Failed to update photo");
    }
  }
);

export const deletePhoto = createAsyncThunk(
  "deletePhoto",
  async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/gallery/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      return id;
    } else {
      throw new Error("Failed to delete photo");
    }
  }
);

export const photoGallerySlice = createSlice({
  name: "photoGallery",
  initialState: {
    photos: [] as PhotoItem[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotoGallery.fulfilled, (state, action) => {
      state.photos = action.payload;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.photos = state.photos.filter(
        (photo: PhotoItem) => photo._id !== action.payload
      );
    });
    builder.addCase(addPhoto.fulfilled, () => {});
    builder.addCase(updatePhoto.fulfilled, () => {});
  },
});

//export const {  } = photoGallerySlice.actions;
export default photoGallerySlice.reducer;
