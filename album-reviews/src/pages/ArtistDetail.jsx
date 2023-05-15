import { useLoaderData, Await, useNavigate, defer } from "react-router";
import { getArtistDetail, getAllAlbumsByArtist } from "../firebase/firestore";
import { Suspense } from "react";
import ArtistDetailInfo from "../components/UI/ArtistDetail/ArtistDetailInfo";
import AlbumGrid from "../components/UI/AlbumGrid";
import TrackRankings from "../components/UI/ArtistDetail/TrackRankings";

const ArtistDetailPage = () => {
  const { artist, albums } = useLoaderData();
  const navigate = useNavigate();
  // document.title = "Albums";
  function navigateToAlbumDetail(albumID) {
    navigate("/albums/" + albumID);
  }
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await
          resolve={[albums, artist]}
          error={<div>There was an error loading the artist information</div>}
        >
          {([albumsData, artistData]) => (
            <>
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

              {/* {console.log(albumsData)} */}
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
  // console.log(params);

  return defer({
    artist: await getArtistDetail(id),
    albums: await getAllAlbumsByArtist(id),
  });
}
