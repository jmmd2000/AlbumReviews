import classes from "./AlbumCard.module.css";

import ReviewScore from "./AlbumDetail/ReviewScore";

// This component nicely displays an album's cover, name, artist, release date and my rating.
// It takes a cardClickFunction prop that allows it to be used to navigate to the album's detail page.

const AlbumCard = (props) => {
  const {
    albumName,
    artistName,
    albumArt,
    releaseDate,
    albumID,
    cardClickFunction,
    finalRating,
  } = props;

  const clickHandler = () => {
    cardClickFunction(albumID);
  };

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
      <p className={classes.albumArtist}>
        {artistName}
        {" - "}
        <span className={classes.albumYear}>{releaseDate.substring(0, 4)}</span>
      </p>
    </div>
  );
};

export default AlbumCard;
