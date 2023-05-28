import { Suspense, useState, useContext } from "react";
import { getAlbumDetail } from "../firebase/firestore";
import { useRouteLoaderData, useRouteError, Await, defer } from "react-router";
import { AuthContext } from "../context/AuthContext";
import AlbumDetailInfo from "../components/UI/AlbumDetail/AlbumDetailInfo";

import CommentSection from "../components/UI/AlbumDetail/CommentSection";
import TrackList from "../components/UI/AlbumDetail/TrackList";
import OptionButtons from "../components/UI/AlbumDetail/OptionButtons";
import ErrorCard from "../components/Error/ErrorCard";

// This page displays the details of an album review.
// It uses the useRouteLoaderData hook to get the data from the loader function.
// The AuthContext is used to determine whether the user is logged in or not, to show the option buttons.

// TODO: Add a custom skeleton for the fallback

const AlbumDetailPage = () => {
  const [pageTitle, setPageTitle] = useState("Albums");
  const { isLoggedIn } = useContext(AuthContext);
  const error = useRouteError();
  document.title = pageTitle;
  const album = useRouteLoaderData("album-detail");
  console.log(album);

  return (
    <>
      <Suspense>
        <Await
          resolve={album}
          errorElement={<ErrorCard />}
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
              {isLoggedIn && (
                <OptionButtons
                  albumID={albumData.album.album.id}
                  artistID={albumData.album.album.artists[0].id}
                />
              )}
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

  return defer({
    album: await getAlbumDetail(id),
  });
}

export function action({ params }) {}
