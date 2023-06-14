import classes from "./ArtistBioRow.module.css";

import { useEffect, useReducer } from "react";
import { getArtistDetail } from "../../../firebase/firestore";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: false,
        artistData: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: true };
    default:
      throw new Error("Invalid action type");
  }
}

// This component displays the artist info on the album detail page.
// This goes in the AlbumDetail component. The artist info contained in the album
// object does not contain enough info for the artist so it must be fetched seoarately.
// It uses a reducer to manage the different states.

const ArtistBioRow = ({ artistID }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    error: false,
    artistData: null,
  });

  // Fetch the artist info and manage the different states
  useEffect(() => {
    async function getArtistInfo() {
      dispatch({ type: "FETCH_INIT" });
      const artistDetail = await getArtistDetail(artistID);

      if (artistDetail === undefined) {
        dispatch({ type: "FETCH_FAILURE" });
      } else {
        dispatch({ type: "FETCH_SUCCESS", payload: artistDetail });
      }
    }
    getArtistInfo();
  }, []);

  return (
    <div className={classes.artistInfo}>
      {state.error && (
        <p className={classes.errorMessage}>Error retrieving artist details</p>
      )}
      {state.isLoading && (
        <>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton
            variant="text"
            width={100}
          />
        </>
      )}
      {state.artistData !== null && (
        <>
          <img
            src={state.artistData.artist.images[0].url}
            alt="Photo of Post Malone"
            className={classes.artistImage}
          />
          <h2 className={classes.artistName}>
            <Link to={"/artists/" + state.artistData.artist.id}>
              {JSON.stringify(state.artistData.artist.name).substring(
                1,
                JSON.stringify(state.artistData.artist.name).length - 1
              )}
            </Link>
          </h2>
        </>
      )}
    </div>
  );
};

export default ArtistBioRow;
