import { useEffect, useState } from "react";
import { addAlbum, getAccessToken } from "../firebase/firestore";
import AlbumCard from "./UI/AlbumCard";
import AlbumGrid from "./UI/AlbumGrid";

const Form = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let inputValue;
  const { responseCode, responseMessage, responseData } = addAlbum(inputValue);

  // TODO
  // 1. Manage error states and loading states

  async function search() {
    const accessToken = await getAccessToken();
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
      // "https://api.spotify.com/v1/search?q=happier&type=album&limit=21",
      searchParamaters
    );
    request = await request.json();

    if (request.error) {
      console.log(request.error);
      return;
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
  }

  return (
    <form>
      <input
        type="text"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          search();
        }}
      >
        Submit
      </button>
      <AlbumGrid albums={searchResults} />
    </form>
  );
};

export default Form;
