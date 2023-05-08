import { useState } from "react";

import AlbumGrid from "../UI/AlbumGrid";
import { ColorRing } from "react-loader-spinner";
import classes from "./AlbumForm.module.css";

const AlbumForm = ({
  searchFunction,
  setSearchState,
  loading,
  error,
  searchResults,
}) => {
  return (
    <>
      <form className={classes.searchForm}>
        <input
          className={classes.searchInput}
          type="text"
          onChange={(event) => {
            setSearchState(event.target.value);
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
        <AlbumGrid albums={searchResults} />
      )}
      {searchResults.length === 0 && <p>No results found</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default AlbumForm;
