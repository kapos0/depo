export default function CreatePage() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="display-2 text-center">Photo Add Page</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Photo Title
        </label>
        <input type="text" className="form-control" id="title" />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Photo Price
        </label>
        <input type="text" className="form-control" id="price" />
      </div>
      <div className="mb-3">
        <label htmlFor="imageurl" className="form-label">
          Image URL
        </label>
        <input type="text" className="form-control" id="imageurl" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
