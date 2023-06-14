import classes from "./Grid.module.css";

import { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";

import ArtistCard from "./ArtistCard";

// This component displays a grid of artist cards.

const ArtistGrid = ({ artists, cardClickFunction }) => {
  // const [layoutClass, setLayoutClass] = useState(classes.grid);
  const [artistsList, setArtistsList] = useState(artists);

  // useEffect(() => {
  //   if (artists.length < 6) {
  //     setLayoutClass(classes.flex);
  //   } else {
  //     setLayoutClass(classes.grid);
  //   }
  // }, [artists]);

  // This function is used to sort the artists based on the sort type
  const sortArtists = (sortType) => {
    let sortedArtists = [...artistsList];
    switch (sortType) {
      case "ratAsc":
        sortedArtists.sort((a, b) => {
          return a.averageRating - b.averageRating;
        });
        break;
      case "ratDesc":
        sortedArtists.sort((a, b) => {
          return b.averageRating - a.averageRating;
        });
        break;
      case "artistAZ":
        sortedArtists.sort((a, b) => {
          return a.artist.name.localeCompare(b.artist.name);
        });
        break;
      case "recent":
        sortedArtists.sort((a, b) => {
          return a.updateTimestamp - b.updateTimestamp;
        });
        break;
      default:
        break;
    }
    setArtistsList(sortedArtists);
  };

  // This function is used to filter the albums based on the search term
  // Every time the user types a character, it updates the filter
  // It checks if the album name, artist name, or release date includes the search term
  const searchArtists = (searchTerm) => {
    let filteredArtists = [...artists];
    filteredArtists = filteredArtists.filter((artist) => {
      return artist.artist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setArtistsList(filteredArtists);
  };

  // This is the list of options for the sort dropdown
  const sortOptions = [
    { value: "default", text: "Sort By" },
    // { value: "recent", text: "Recently Added" },
    { value: "ratAsc", text: "Rating (Low to High)" },
    { value: "ratDesc", text: "Rating (High to Low)" },
    { value: "artistAZ", text: "Artist (A-Z)" },
  ];

  return (
    <>
      {artists.length > 1 && (
        <SearchFilter
          sortFunction={sortArtists}
          searchFunction={searchArtists}
          placeholderText={"Search artist..."}
          options={sortOptions}
        />
      )}

      {artistsList.length === 0 && (
        <h1 className={classes.noneMessage}>No artists found!</h1>
      )}

      <div className={classes.grid}>
        {artistsList.map((artist, i) => {
          let artistObject = {
            name: artist.artist.name,
            images: [...artist.artist.images],
            id: artist.artist.id,
            rating: artist.averageRating,
          };

          return (
            <ArtistCard
              key={i}
              {...artistObject}
              cardClickFunction={cardClickFunction}
            />
          );
        })}
      </div>
    </>
  );
};

export default ArtistGrid;
