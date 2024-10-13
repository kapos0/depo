import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchPhotoGallery, PhotoItem } from "../redux/photoGallerySlice";
import PhotoCard from "../components/PhotoCard";

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const photos = useSelector((state: RootState) => state.photoGallery.photos);
  useEffect(() => {
    dispatch(fetchPhotoGallery());
  }, [dispatch]);
  return (
    <>
      {photos?.length === 0 ? (
        <h1 className="display-1 text-center">
          There are no photos to show here 😣 <p>Plase add some</p>
        </h1>
      ) : (
        <div className="d-flex flex-row justify-content-center flex-wrap mt-3">
          {photos?.map((photo: PhotoItem) => (
            <PhotoCard key={photo._id} {...photo} />
          ))}
        </div>
      )}
    </>
  );
}
