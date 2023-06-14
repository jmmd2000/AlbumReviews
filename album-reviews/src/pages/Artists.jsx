import { getAllArtists } from "../firebase/firestore";
import ArtistGrid from "../components/UI/ArtistGrid";
import { useLoaderData, Await, useNavigate, defer } from "react-router";
import React, { Suspense } from "react";
import SkeletonGrid from "../components/UI/Skeletons/SkeletonGrid";

const ArtistsPage = () => {
  document.title = "Artists";
  const { artistList } = useLoaderData();

  const navigate = useNavigate();

  function navigateToArtistDetail(artistID) {
    navigate(artistID);
  }
  return (
    <>
      <Suspense
        fallback={
          <SkeletonGrid
            width={152}
            height={152}
            num={12}
            shape={"circular"}
            filters={true}
          />
        }
      >
        <Await
          resolve={artistList}
          error={<div>There was an error loading the albums.</div>}
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
