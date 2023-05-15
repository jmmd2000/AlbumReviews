import classes from "./Grid.module.css";
import ArtistCard from "./ArtistCard";

const ArtistGrid = ({ artists, cardClickFunction }) => {
  console.log(artists);

  return (
    <div className={classes.grid}>
      {artists.map((artist, i) => {
        let artistObject = {
          name: artist.artist.name,
          images: [...artist.artist.images],
          id: artist.artist.id,
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
  );
};

export default ArtistGrid;
