import { useEffect, useState } from "react";
import AlbumSearch from "../components/UI/AlbumSearch";
import AlbumForm from "../components/UI/AlbumForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import { clientID, clientSecret } from "../keys";

// This page is used to add a new album review.
// Code for accessing the Spotify API is here.
// Move this code to a separate file later.

const NewAlbumPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [albumChosen, setAlbumChosen] = useState(false);
  const [albumID, setAlbumID] = useState(null);
  const [album, setAlbum] = useState({});
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    console.log(artist);
  }, [artist]);

  useEffect(() => {
    async function fixToken() {
      const token = await getAccessToken();
      setAccessToken(token);
    }

    if (accessToken === null) {
      setError("Access token is null");
      fixToken();
      setError(null);
    }
  }, [accessToken]);

  // TODO: Manage error states and loading states

  async function search() {
    setLoading(true);
    // if (accessToken === null) {
    //   console.log(accessToken + " 1" + " " + Date.now());
    //   // const at = await getAccessToken();
    //   await getAccessToken();
    //   console.log(accessToken + " 2" + " " + Date.now());
    //   // setAccessToken(at);
    //   console.log(accessToken + " 3" + " " + Date.now());
    //   console.log("error" + " " + Date.now());
    //   setError("Access token is null");
    //   return;
    // }

    var searchParamaters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var request = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput +
        "&type=album&limit=18",
      searchParamaters
    );
    request = await request.json();

    if (request.error) {
      // console.log(request.error);
      // return;
    }

    var data = request.albums.items;

    var modifiedArray = [...data];

    modifiedArray.forEach((element) => {
      //remove the element if its a single
      if (
        element.album_type === "single" ||
        element.album_group === "single" ||
        element.total_tracks === 1
      ) {
        modifiedArray.splice(modifiedArray.indexOf(element), 1);
      }
    });

    setSearchResults(modifiedArray);

    setLoading(false);
  }

  function parseSearchResults(searchResults) {
    const results = [];
    searchResults.forEach((result) => {
      results.push(result);
    });

    return results;
  }

  const parsedResults = parseSearchResults(searchResults);

  // Dumber version of old access token code.
  // Just simply requests a new access token every time.
  async function getAccessToken() {
    let accessToken = null;

    const authString = `${clientID}:${clientSecret}`;
    const encodedAuthString = btoa(authString);
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
      },
      body: "grant_type=client_credentials",
    };

    const response = await fetch(tokenEndpoint, requestOptions);
    const data = await response.json();

    accessToken = data.access_token;
    // setAccessToken(accessToken);

    return accessToken;
  }

  async function getAlbum(id, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    setLoading(true);
    const data = await response.json();

    setLoading(false);

    return data;
  }

  async function getArtist(id, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    setLoading(true);
    const data = await response.json();

    setLoading(false);

    return data;
  }

  async function cardClickFunction(id) {
    setLoading(true);
    setAlbumID(id);
    const album = await getAlbum(id, accessToken);
    setAlbum(album);

    const artistData = await getArtist(album.artists[0].id, accessToken);
    setArtist(artistData);

    setAlbumChosen(true);
    setLoading(false);
  }

  return (
    <>
      {!albumChosen && artist === null && (
        <AlbumSearch
          searchFunction={search}
          setSearchState={setSearchInput}
          loading={loading}
          error={error}
          // searchResults={searchResults}
          searchResults={parsedResults}
          cardClickFunction={cardClickFunction}
          albumID={albumID}
        />
      )}
      {loading && <LoadingSpinner />}

      {albumChosen && !loading && artist != null && (
        <AlbumForm
          album={album}
          artist={artist}
        />
      )}
    </>
  );
};

export default NewAlbumPage;
