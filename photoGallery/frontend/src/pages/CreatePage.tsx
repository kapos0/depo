import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addPhoto } from "../redux/photoGallerySlice";

export default function CreatePage() {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageUrl] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(addPhoto({ title, price: Number(price), image: imageurl }));
    setTitle("");
    setPrice("");
    setImageUrl("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="display-2 text-center">Photo Add Page</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Photo Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Photo Price
        </label>
        <input
          type="text"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="imageurl" className="form-label">
          Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="imageurl"
          value={imageurl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
