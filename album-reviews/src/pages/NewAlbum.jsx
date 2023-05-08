import { useEffect, useState } from "react";
import { addAlbum } from "../firebase/firestore";
import AlbumCard from "../components/UI/AlbumCard";
import AlbumGrid from "../components/UI/AlbumGrid";
import AlbumForm from "../components/UI/AlbumForm";

import { clientID, clientSecret } from "../keys";

const NewAlbumPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  // const [tokenIsValid, setTokenIsValid] = useState(false);

  let inputValue;
  const { responseCode, responseMessage, responseData } = addAlbum(inputValue);

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

    console.log(request);

    if (request.error) {
      console.log(request.error);
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
    console.log(modifiedArray);
    setLoading(false);
  }

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

  return (
    <>
      <AlbumForm
        searchFunction={search}
        setSearchState={setSearchInput}
        loading={loading}
        error={error}
        searchResults={searchResults}
      />
    </>
  );

  // return (
  //   <form>
  //     <input
  //       type="text"
  //       onChange={(event) => {
  //         setSearchInput(event.target.value);
  //       }}
  //     />
  //     <button
  //       type="submit"
  //       onClick={(event) => {
  //         event.preventDefault();
  //         search();
  //       }}
  //     >
  //       Submit
  //     </button>
  //     {loading && <p>Loading...</p>}
  //     {searchResults.length === 0 && <p>No results found</p>}
  //     {error && <p>{error}</p>}
  //     <AlbumGrid albums={searchResults} />
  //   </form>
  // );
};

export default NewAlbumPage;
