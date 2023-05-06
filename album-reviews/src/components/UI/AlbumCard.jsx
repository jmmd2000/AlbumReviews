import classes from "./AlbumCard.module.css";

const AlbumCard = (props) => {
  const { albumName, artistName, albumArt, releaseDate, spotifyLink } = props;

  // console.log(props);

  return (
    <div className={classes.albumCard}>
      <img
        src={albumArt[1].url}
        alt={albumName}
      />
      <h3 className={classes.albumTitle}>{albumName}</h3>
      <p className={classes.albumArtist}>{artistName}</p>
    </div>
  );
};

export default AlbumCard;
