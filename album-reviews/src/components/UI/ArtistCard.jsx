import classes from "./ArtistCard.module.css";
const ArtistCard = (props) => {
  const { name, images, id, cardClickFunction } = props;
  // console.log(artist);
  const clickHandler = () => {
    cardClickFunction(id);
  };

  return (
    <div
      className={classes.artistCard}
      onClick={clickHandler}
    >
      <img
        src={images[2].url}
        alt={name}
      />
      <h3 className={classes.artistName}>{name}</h3>
    </div>
  );
};

export default ArtistCard;
