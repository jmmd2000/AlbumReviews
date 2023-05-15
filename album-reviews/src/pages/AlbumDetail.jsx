import { Suspense, useEffect, useState } from "react";
import { getAlbumDetail, getArtistDetail } from "../firebase/firestore";
import { useRouteLoaderData, useLoaderData, Await, defer } from "react-router";
import AlbumCard from "../components/UI/AlbumCard";
import AlbumDetailInfo from "../components/UI/AlbumDetail/AlbumDetailInfo";
import CommentSection from "../components/UI/AlbumDetail/CommentSection";
import TrackList from "../components/UI/AlbumDetail/TrackList";
import OptionButtons from "../components/UI/AlbumDetail/OptionButtons";

const AlbumDetailPage = () => {
  const [pageTitle, setPageTitle] = useState("Albums");
  document.title = pageTitle;
  const album = useRouteLoaderData("album-detail");
  // const [artistInfo, setArtistInfo] = useState(null);
  console.log(album);

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await
          resolve={album}
          error={<div>There was an error loading the album information</div>}
        >
          {(albumData) => (
            <>
              {setPageTitle(albumData.album.album.name)}
              <AlbumDetailInfo albumData={albumData.album} />
              {albumData.album.comment !== "" && (
                <CommentSection comments={albumData.album.comment} />
              )}
              <TrackList
                tracks={albumData.album.album.tracks.items}
                ratings={albumData.album.ratings}
              />
              <OptionButtons
                albumID={albumData.album.album.id}
                artistID={albumData.album.album.artists[0].id}
              />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default AlbumDetailPage;

export async function loader({ params }) {
  const id = params.albumID;
  // console.log(params);

  return defer({
    album: await getAlbumDetail(id),
  });
}

export function action({ params }) {
  console.log("action");
  console.log(params);
}
