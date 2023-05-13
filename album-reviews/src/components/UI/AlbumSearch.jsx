import { useState } from "react";

import AlbumGrid from "./AlbumGrid";
import { ColorRing } from "react-loader-spinner";
import classes from "./AlbumSearch.module.css";

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
      ) : (
        <AlbumGrid
          albums={searchResults}
          cardClickFunction={cardClickFunction}
          source="SEARCH"
        />
      )}
      {searchResults.length === 0 && <p>No results found</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default AlbumSearch;
