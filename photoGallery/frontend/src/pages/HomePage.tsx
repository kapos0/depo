import PhotoCard from "../components/PhotoCard";
import Modal from "../components/Modal";

export default function HomePage() {
  return (
    <>
      <h1 className="display-1">There are no photos to show here 😣</h1>
      <p>Plase add some</p>
      <PhotoCard />
      <Modal />
    </>
  );
}
