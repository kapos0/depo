export default function Modal() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
                <input type="text" id="title" className="form-control" />
                <label className="form-label" htmlFor="title">
                  Photo Title
                </label>
              </div>

              <div className="form-outline mb-4">
                <input type="number" id="price" className="form-control" />
                <label className="form-label" htmlFor="price">
                  Photo Price
                </label>
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="imageurl" className="form-control" />
                <label className="form-label" htmlFor="imageurl">
                  Image Url
                </label>
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
