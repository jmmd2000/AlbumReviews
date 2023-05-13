import { useEffect, useState } from "react";
import { addAlbum } from "../firebase/firestore";
import { ColorRing } from "react-loader-spinner";
import AlbumCard from "../components/UI/AlbumCard";
import AlbumGrid from "../components/UI/AlbumGrid";
import AlbumSearch from "../components/UI/AlbumSearch";
import AlbumForm from "../components/UI/AlbumForm";

import { clientID, clientSecret } from "../keys";

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

  // TODO
  // 1. Manage error states and loading states

  async function search() {
    // setLoading(true);
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
    console.log(searchInput);
    console.log(accessToken);

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

    // console.log(request);

    if (request.error) {
      console.log(request.error);
      // return;
    }

    var data = request.albums.items;

    var modifiedArray = [...data];
    // console.log(modifiedArray);

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
    console.log(modifiedArray);
    // console.log(modifiedArray[0].id);
    // setLoading(false);
  }

  function parseSearchResults(searchResults) {
    const results = [];
    searchResults.forEach((result) => {
      results.push(result);
    });
    // console.log(results);
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
    // console.log(data);
    // console.log(data + " " + Date.now());
    accessToken = data.access_token;
    // setAccessToken(accessToken);

    return accessToken;
  }

  async function getAlbum(id, accessToken) {
    // console.log(id);
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    setLoading(true);
    const data = await response.json();

    // console.log(data);
    setLoading(false);

    return data;
  }

  async function getArtist(id, accessToken) {
    console.log(id);
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    setLoading(true);
    const data = await response.json();

    console.log(data);
    setLoading(false);

    return data;
  }

  async function cardClickFunction(id) {
    setLoading(true);
    setAlbumID(id);
    const album = await getAlbum(id, accessToken);
    setAlbum(album);
    console.log(album.artists[0].id);
    const artistData = await getArtist(album.artists[0].id, accessToken);
    setArtist(artistData);

    console.log(artist);

    setAlbumChosen(true);
    setLoading(false);
    console.log(album);
    console.log(artistData);
    console.log(artist);
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
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            display: "block",
            margin: "auto",
          }}
          wrapperClass="blocks-wrapper"
          // className={classes.centerSpinner}
          colors={[
            "#9b59b6",
            "#5c7cfa",
            "#339af0",
            "#51cf66",
            "#f1c40f",
            "#e67e22",
            "#e74c3c",
            "#34495e",
          ]}
        />
      )}
      {console.log(artist)}
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
