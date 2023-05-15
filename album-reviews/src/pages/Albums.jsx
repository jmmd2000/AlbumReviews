import React, { Suspense } from "react";
import { useLoaderData, Await, useNavigate, defer } from "react-router";

import AlbumGrid from "../components/UI/AlbumGrid";
import { getAllAlbums } from "../firebase/firestore";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import SkeletonGrid from "../components/UI/Skeletons/SkeletonGrid";

const AlbumsPage = () => {
  document.title = "Albums";
  const { albumList } = useLoaderData();
  const navigate = useNavigate();

  function navigateToAlbumDetail(albumID) {
    navigate(albumID);
  }

  return (
    <>
      <h1>Albums</h1>
      <Suspense fallback={<SkeletonGrid />}>
        <Await
          resolve={albumList}
          error={<div>There was an error loading the albums.</div>}
          // children={}
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
