import AlbumCard from "./AlbumCard";
import classes from "./AlbumGrid.module.css";

const AlbumGrid = ({ albums }) => {
  return (
    <div className={classes.albumGrid}>
      {albums.map((album, i) => {
        const albumObject = {
          albumName: album.name,
          artistName: album.artists[0].name,
          albumArt: [...album.images],
          releaseDate: album.release_date,
          spotifyLink: album.external_urls.spotify,
        };

        return (
          <AlbumCard
            key={i}
            {...albumObject}
          />
        );
      })}
    </div>
  );
};

export default AlbumGrid;
