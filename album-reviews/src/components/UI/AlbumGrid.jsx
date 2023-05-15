import AlbumCard from "./AlbumCard";
import classes from "./Grid.module.css";
import { useState, useEffect } from "react";

const AlbumGrid = ({ albums, cardClickFunction, source }) => {
  const [layoutClass, setLayoutClass] = useState(classes.grid);
  console.log(albums);

  useEffect(() => {
    if (albums.length < 6) {
      setLayoutClass(classes.flex);
    } else {
      setLayoutClass(classes.grid);
    }
  }, [albums]);

  return (
    <div className={layoutClass}>
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
