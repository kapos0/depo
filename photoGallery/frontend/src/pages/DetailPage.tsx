import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PhotoItem } from "../redux/photoGallerySlice";
import { RootState } from "../redux/store";
import PhotoCard from "../components/PhotoCard";
export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const photos = useSelector((state: RootState) => state.photoGallery.photos);
  const photo = photos.find((photo: PhotoItem) => photo._id === id);
  return (
    <>
      {photo ? (
        <PhotoCard {...photo} />
      ) : (
        <h1 className="text-center">Photo not found</h1>
      )}
    </>
  );
}
