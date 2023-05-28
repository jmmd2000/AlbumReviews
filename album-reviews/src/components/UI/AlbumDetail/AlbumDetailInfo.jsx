import classes from "./AlbumDetailInfo.module.css";

import useDate from "../../../hooks/use-date";
import ArtistBioRow from "./ArtistBioRow";
import PostDates from "./PostDates";
import ReviewScore from "./ReviewScore";

// This component displays the album cover, album name, artist name, review score, and album stats
// It uses the useDate hook to format the dates and the formatMilliseconds function to format the album runtime.

const AlbumDetailInfo = ({ albumData }) => {
  const releaseDate = useDate(albumData.album.release_date);

  const album = albumData.album;

  return (
    <div className={classes.container}>
      <div className={classes.albumDetailHeader}>
        <img
          src={album.images[0].url}
          alt="album cover"
          className={classes.albumCover}
        />
        <div className={classes.infoDiv}>
          <h1 className={classes.albumName}>{album.name}</h1>

          <div className={classes.flexRow}>
            <ArtistBioRow artistID={album.artists[0].id} />
          </div>

          <div className={classes.albumDescription}>
            <p className={classes.albumStatTitle}># of songs</p>
            <p className={classes.albumStatTitle}>Runtime</p>
            <p className={classes.albumStatTitle}>Release date</p>
            <p className={classes.albumStat}>{album.total_tracks} songs</p>
            <p className={classes.albumStat}>
              {formatMilliseconds(albumData.durationMS)}
            </p>
            <p className={classes.albumStat}>{releaseDate}</p>
          </div>
        </div>
        <div></div>
        <PostDates
          postDate={albumData.postDate}
          editDate={albumData.updateDate}
        />
        <ReviewScore
          score={albumData.finalRating}
          onCard={false}
          style={classes.scorePosition}
        />
      </div>
    </div>
  );
};

export default AlbumDetailInfo;

export function formatMilliseconds(ms, format) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(ms / 1000);

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Construct the formatted string
  let formattedString = "";
  if (format === "short") {
    if (seconds < 10) {
      formattedString = `${minutes}:0${seconds}`;
    } else {
      formattedString = `${minutes}:${seconds}`;
    }
  } else {
    formattedString = `${minutes} mins ${seconds} seconds`;
  }

  return formattedString;
}
