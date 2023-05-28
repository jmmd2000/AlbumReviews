import { useLoaderData, Await, useNavigate, defer } from "react-router";
import { getArtistDetail, getAllAlbumsByArtist } from "../firebase/firestore";
import { Suspense, useState } from "react";
import ArtistDetailInfo from "../components/UI/ArtistDetail/ArtistDetailInfo";
import AlbumGrid from "../components/UI/AlbumGrid";
import TrackRankings from "../components/UI/ArtistDetail/TrackRankings";

// This page displays the details of an artist
// It uses the useRouteLoaderData hook to get the data from the loader function.

// TODO: Add a custom skeleton for the fallback

const ArtistDetailPage = () => {
  const { artist, albums } = useLoaderData();
  const [pageTitle, setPageTitle] = useState("Artists");
  document.title = pageTitle;
  const navigate = useNavigate();
  function navigateToAlbumDetail(albumID) {
    navigate("/albums/" + albumID);
  }
  return (
    <>
      <Suspense>
        <Await
          resolve={[albums, artist]}
          error={<div>There was an error loading the artist information</div>}
        >
          {([albumsData, artistData]) => (
            <>
              {setPageTitle(artistData.artist.name)}
              <ArtistDetailInfo
                artistData={artistData}
                albumData={albumsData}
              />
              <TrackRankings albumData={albumsData} />
              <AlbumGrid
                albums={albumsData}
                cardClickFunction={navigateToAlbumDetail}
                source="ALBUMS"
              />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default ArtistDetailPage;

export async function loader({ params }) {
  const id = params.artistID;

  return defer({
    artist: await getArtistDetail(id),
    albums: await getAllAlbumsByArtist(id),
  });
}
