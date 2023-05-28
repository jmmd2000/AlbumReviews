import React, { Suspense } from "react";
import { useLoaderData, Await, useNavigate, defer } from "react-router";
import AlbumGrid from "../components/UI/AlbumGrid";
import { getAllAlbums } from "../firebase/firestore";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import SkeletonGrid from "../components/UI/Skeletons/SkeletonGrid";

// This page displays all the albums in the database.

const AlbumsPage = () => {
  document.title = "Albums";
  const { albumList } = useLoaderData();
  const navigate = useNavigate();

  function navigateToAlbumDetail(albumID) {
    navigate(albumID);
  }

  return (
    <>
      <Suspense
        fallback={
          <SkeletonGrid
            width={200}
            height={253}
            num={12}
            shape={"rectangular"}
            filters={true}
          />
        }
      >
        <Await
          resolve={albumList}
          error={<div>There was an error loading the albums.</div>}
        >
          {(loadedAlbumList) => (
            <AlbumGrid
              albums={loadedAlbumList}
              cardClickFunction={navigateToAlbumDetail}
              source="ALBUMS"
            />
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default AlbumsPage;

export function loader({ params }) {
  return defer({
    albumList: getAllAlbums(),
  });
}
