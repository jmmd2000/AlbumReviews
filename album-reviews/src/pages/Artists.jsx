import { getAllArtists } from "../firebase/firestore";
import ArtistGrid from "../components/UI/ArtistGrid";
import { useLoaderData, Await, useNavigate, defer } from "react-router";
import React, { Suspense } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import SkeletonGrid from "../components/UI/Skeletons/SkeletonGrid";

const ArtistsPage = () => {
  document.title = "Artists";
  const { artistList } = useLoaderData();
  console.log(artistList);
  const navigate = useNavigate();

  function navigateToArtistDetail(artistID) {
    navigate(artistID);
  }
  return (
    <>
      <h1>Artists</h1>
      <Suspense fallback={<SkeletonGrid />}>
        <Await
          resolve={artistList}
          error={<div>There was an error loading the albums.</div>}
          // children={}
        >
          {(loadedArtistList) => (
            <>
              <ArtistGrid
                artists={loadedArtistList}
                cardClickFunction={navigateToArtistDetail}
              />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default ArtistsPage;

export function loader({ params }) {
  return defer({
    artistList: getAllArtists(),
  });
}
