import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updatePhoto, PhotoItem } from "../redux/photoGallerySlice";
export default function Modal({ _id, title, image, price }: PhotoItem) {
  const dispatch: AppDispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const [newImageUrl, setNewImageUrl] = useState(image);
  const [newPrice, setNewPrice] = useState(price);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(
      updatePhoto({ _id, title: newTitle, image: newImageUrl, price: newPrice })
    );
    setNewTitle("");
    setNewImageUrl("");
    setNewPrice(0);
  }
  return (
    <div className="modal fade" id="editModal">
      <div className="modal-dialog d-flex justify-content-center">
        <div className="modal-content w-75">
          <div className="modal-header">
            <h5 className="modal-title">Update Photo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="title">
                  Photo Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="price">
                  Photo Price:
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="imageurl">
                  Image Url:
                </label>
                <input
                  type="text"
                  id="imageurl"
                  className="form-control"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
