import classes from "./AlbumCard.module.css";
import { Link } from "react-router-dom";

import ReviewScore from "./AlbumDetail/ReviewScore";

const AlbumCard = (props) => {
  const {
    albumName,
    artistName,
    albumArt,
    releaseDate,
    spotifyLink,
    albumID,
    cardClickFunction,
    finalRating,
  } = props;

  const clickHandler = () => {
    cardClickFunction(albumID);
  };

  // console.log(props);

  return (
    <div
      className={classes.albumCard}
      onClick={clickHandler}
    >
      {finalRating !== undefined && (
        <ReviewScore
          score={finalRating}
          onCard={true}
        />
      )}
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
