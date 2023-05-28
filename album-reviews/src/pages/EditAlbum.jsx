import { useLoaderData } from "react-router-dom";
import { getAlbumDetail } from "../firebase/firestore";
import AlbumForm from "../components/UI/AlbumForm";

// This page is used to edit an album review
// It uses the useLoaderData hook to get the album review data from the loader function
// It uses the getAlbumDetail function from firestore.js to get the album review data
// It uses the AlbumForm component to display the form to edit the album review

const EditAlbumPage = () => {
  const existingAlbum = useLoaderData();
  return (
    <>
      <h1>Edit Album</h1>
      <AlbumForm existingAlbum={existingAlbum} />
    </>
  );
};

export default EditAlbumPage;

export async function loader({ params }) {
  const album = await getAlbumDetail(params.albumID);
  return album;
}
