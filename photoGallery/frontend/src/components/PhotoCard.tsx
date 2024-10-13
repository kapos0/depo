export default function PhotoCard() {
  return (
    <div className="card">
      <img src="https://i.imgur.com/ZTkt4I5.jpg" className="card-img-top" />
      <div className="card-body">
        <h2 className="card-title">Card title</h2>
        <h6 className="card-text fw-normal">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </h6>
        <button
          className="btn btn-primary me-2"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          <i className="bi bi-pen-fill"></i>
        </button>
        <button className="btn btn-danger">
          <i className="bi bi-trash2-fill"></i>
        </button>
      </div>
    </div>
  );
}
