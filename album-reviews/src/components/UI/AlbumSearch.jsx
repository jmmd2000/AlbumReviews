import classes from "./AlbumSearch.module.css";

import { useState } from "react";
import AlbumGrid from "./AlbumGrid";

// This component displays a search bar and a grid of album cards.
// This is only accessible to me so I can search for albums to review.

const AlbumSearch = ({
  searchFunction,
  setSearchState,
  loading,
  error,
  searchResults,
  cardClickFunction,
}) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <form className={classes.searchForm}>
        <input
          className={classes.searchInput}
          id="searchInput"
          type="text"
          value={searchInput}
          onChange={(event) => {
            setSearchState(event.target.value);
            setSearchInput(event.target.value);
          }}
        />
        <button
          className={classes.searchButton}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            searchFunction();
          }}
        >
          Submit
        </button>
      </form>

      {loading ? (
        <></>
      ) : (
        <AlbumGrid
          albums={searchResults}
          cardClickFunction={cardClickFunction}
          source="SEARCH"
        />
      )}
      {/* {searchResults.length === 0 && <p>No results found</p>} */}
      {error && <p>{error}</p>}
    </>
  );
};

export default AlbumSearch;
