import classes from "./Grid.module.css";

import AlbumCard from "./AlbumCard";
import SearchFilter from "./SearchFilter";
import { useState } from "react";

// This component displays a grid of album cards.

const AlbumGrid = ({ albums, cardClickFunction, source }) => {
  const [albumsList, setAlbumsList] = useState(albums);

  console.log(albumsList);

  // This useEffect is used to update the layout of the grid
  // If there are less than 6 albums, it will use flexbox
  // If there are more than 6 albums, it will use grid
  // useEffect(() => {
  //   if (albumsList.length < 6) {
  //     setLayoutClass(classes.flex);
  //   } else {
  //     setLayoutClass(classes.grid);
  //   }
  // }, [albumsList]);

  // This function is used to sort the albums based on the sort type
  const sortAlbums = (sortType) => {
    let sortedAlbums = [...albumsList];
    switch (sortType) {
      case "ratAsc":
        sortedAlbums.sort((a, b) => {
          return a.finalRating - b.finalRating;
        });
        break;
      case "ratDesc":
        sortedAlbums.sort((a, b) => {
          return b.finalRating - a.finalRating;
        });
        break;
      case "albumAZ":
        sortedAlbums.sort((a, b) => {
          return a.album.name.localeCompare(b.album.name);
        });
        break;
      case "artistAZ":
        sortedAlbums.sort((a, b) => {
          return a.album.artists[0].name.localeCompare(b.album.artists[0].name);
        });
        break;
      case "recent":
        sortedAlbums.sort((a, b) => {
          return b.postDate - a.postDate;
        });
        break;
      default:
        break;
    }
    setAlbumsList(sortedAlbums);
  };

  // This function is used to filter the albums based on the search term
  // Every time the user types a character, it updates the filter
  // It checks if the album name, artist name, or release date includes the search term
  const searchAlbums = (searchTerm) => {
    let filteredAlbums = [...albums];
    filteredAlbums = filteredAlbums.filter((album) => {
      return (
        album.album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.album.artists[0].name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        album.album.release_date.includes(searchTerm)
      );
    });
    setAlbumsList(filteredAlbums);
  };

  // This is the list of options for the sort dropdown
  const sortOptions = [
    { value: "default", text: "Sort By" },
    { value: "recent", text: "Recently Added" },
    { value: "ratAsc", text: "Rating (Low to High)" },
    { value: "ratDesc", text: "Rating (High to Low)" },
    { value: "albumAZ", text: "Album (A-Z)" },
    { value: "artistAZ", text: "Artist (A-Z)" },
  ];

  return (
    <>
      {/* This is the search filter that is only shown if the source is ALBUMS and if there are multiple albums */}
      {source === "ALBUMS" && albums.length > 1 && (
        <SearchFilter
          sortFunction={sortAlbums}
          searchFunction={searchAlbums}
          placeholderText={"Search album, artist or release year..."}
          options={sortOptions}
        />
      )}

      <div className={classes.grid}>
        {albumsList.map((album, i) => {
          let albumObject = {};
          {
            /* The object has some weird nesting that changes depending on if it came
               from the db (ALBUMS) or from the Spotify API */
            source === "ALBUMS"
              ? (albumObject = {
                  albumName: album.album.name,
                  artistName: album.album.artists[0].name,
                  albumArt: [...album.album.images],
                  releaseDate: album.album.release_date,
                  spotifyLink: album.album.external_urls.spotify,
                  albumID: album.album.id,
                  finalRating: album.finalRating,
                })
              : (albumObject = {
                  albumName: album.name,
                  artistName: album.artists[0].name,
                  albumArt: [...album.images],
                  releaseDate: album.release_date,
                  spotifyLink: album.external_urls.spotify,
                  albumID: album.id,
                });
          }

          return (
            <AlbumCard
              key={i}
              {...albumObject}
              cardClickFunction={cardClickFunction}
            />
          );
        })}
      </div>
    </>
  );
};

export default AlbumGrid;
