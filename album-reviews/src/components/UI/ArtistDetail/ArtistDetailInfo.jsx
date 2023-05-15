import ReviewScore from "../AlbumDetail/ReviewScore";
import classes from "./ArtistDetailInfo.module.css";
// import { getAllAlbumsByArtist } from "../../../firebase/firestore";

const ArtistDetailInfo = ({ artistData, albumData }) => {
  console.log(albumData);
  const numAlbums =
    albumData.length === 1
      ? albumData.length + " album"
      : albumData.length + " albums";
  return (
    <section className={classes.container}>
      <div className={classes.artistDetailHeader}>
        <img
          src={artistData.artist.images[1].url}
          alt={artistData.artist.name}
          className={classes.artistImage}
        />
        <div className={classes.infoDiv}>
          <h1 className={classes.artistName}>{artistData.artist.name}</h1>

          <div className={classes.flexRow}></div>
          <div className={classes.albumDescription}>
            <p className={classes.albumStatTitle}># of albums reviewed</p>
            <p className={classes.albumStatTitle}>Personal Artist Ranking</p>
            <p className={classes.albumStat}>{numAlbums}</p>
            <p className={classes.albumStat}>{"artistData"}</p>
          </div>
          <ReviewScore
            score={99}
            onCard={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ArtistDetailInfo;
