import React, { useEffect, useState } from "react";
import { useLoaderData, Await, useNavigate } from "react-router";

// import { getAllAlbums } from "../firebase/firestore";
import AlbumGrid from "../components/UI/AlbumGrid";
import { getAllAlbums } from "../firebase/firestore";

const AlbumsPage = () => {
  const albumList = useLoaderData();
  const navigate = useNavigate();

  function navigateToAlbumDetail(albumID) {
    // console.log(albumList);
    navigate(albumID);
  }

  return (
    <>
      <h1>Albums</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
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
      </React.Suspense>
    </>
  );
};

export default AlbumsPage;

export function loader({ params }) {
  return defer({
    albumList: getAllAlbums(),
  });
}
