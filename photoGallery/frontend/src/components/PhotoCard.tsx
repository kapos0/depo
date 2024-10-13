import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  deletePhoto,
  PhotoItem,
  updatePhoto,
} from "../redux/photoGallerySlice";

export default function PhotoCard({ _id, title, image, price }: PhotoItem) {
  const dispatch: AppDispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editImage, setEditImage] = useState(image);
  const [editPrice, setEditPrice] = useState(price);

  function toggleEdit() {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      dispatch(
        updatePhoto({
          _id,
          title: editTitle,
          price: editPrice,
          image: editImage,
        })
      ).then(() => {
        window.location.href = "/";
      });
    }
  }

  return (
    <div className="card m-2">
      <Link to={"detailed/" + _id}>
        <img src={editImage} className="card-img-top img-fluid" />
      </Link>
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="form-control mb-2"
              placeholder="Title"
            />
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              className="form-control mb-2"
              placeholder="Price"
            />
            <input
              type="text"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              className="form-control mb-2"
              placeholder="Image URL"
            />
          </>
        ) : (
          <>
            <h2 className="card-title">{editTitle}</h2>
            <h6 className="card-text fw-normal">
              <span className="fw-bold">Price</span>: ${editPrice}
            </h6>
          </>
        )}
        <p className="fw-light fs-6 text-secondary">{_id}</p>
        <button className="btn btn-primary me-2" onClick={toggleEdit}>
          <i className="bi bi-pen-fill"></i>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(deletePhoto(_id || ""));
          }}
        >
          <i className="bi bi-trash2-fill"></i>
        </button>
      </div>
    </div>
  );
}
