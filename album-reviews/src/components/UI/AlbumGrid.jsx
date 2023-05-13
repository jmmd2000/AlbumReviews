import { useState } from "react";

import AlbumCard from "./AlbumCard";
import classes from "./AlbumGrid.module.css";

const AlbumGrid = ({ albums, cardClickFunction, source }) => {
  // const [source, setSource] = useState("");
  // console.log(albums);

  // function checkSource(albums, source) {
  //   if (source === "SEARCH") {
  //     setSource("SEARCH");
  //   } else if (source === "ALBUMS") {
  //   }
  // }

  return (
    <div className={classes.albumGrid}>
      {albums.map((album, i) => {
        let albumObject = {};
        {
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

        {
          /* console.log(albumObject); */
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
  );
};

export default AlbumGrid;
