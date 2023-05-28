import classes from "./ArtistCard.module.css";

import ReviewScore from "./AlbumDetail/ReviewScore";

// This component nicely displays an artist's name and image.
// It takes a cardClickFunction prop that allows it to be used to navigate to the artist's detail page.
const ArtistCard = (props) => {
  const { name, images, id, cardClickFunction, rating } = props;
  const clickHandler = () => {
    cardClickFunction(id);
  };

  return (
    <div
      className={classes.artistCard}
      onClick={clickHandler}
    >
      {rating !== undefined && (
        <ReviewScore
          score={rating}
          onCard={true}
        />
      )}
      <img
        src={images[2].url}
        alt={name}
      />
      <h3 className={classes.artistName}>{name}</h3>
    </div>
  );
};

export default ArtistCard;
