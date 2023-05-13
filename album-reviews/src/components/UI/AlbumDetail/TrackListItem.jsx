import { useEffect, useState } from "react";
import classes from "./TrackListItem.module.css";
import { formatMilliseconds } from "../AlbumDetail/AlbumDetailInfo";

const TrackListItem = ({ track, index, rating }) => {
  const [ratingClass, setRatingClass] = useState("");
  const [ratingText, setRatingText] = useState("");

  useEffect(() => {
    convertRating(rating);
  }, [rating]);

  function convertRating(rating) {
    switch (rating) {
      case "0":
        setRatingClass(classes.nonSong);
        setRatingText("Non-song");
        break;
      case "1":
        setRatingClass(classes.awful);
        setRatingText("Awful");
        break;
      case "2":
        setRatingClass(classes.bad);
        setRatingText("Bad");
        break;
      case "3":
        setRatingClass(classes.meh);
        setRatingText("Meh");
        break;
      case "4":
        setRatingClass(classes.good);
        setRatingText("Good");
        break;
      case "5":
        setRatingClass(classes.great);
        setRatingText("Great");
        break;
      case "6":
        setRatingClass(classes.amazing);
        setRatingText("Amazing");
        break;
      case "7":
        setRatingClass(classes.perfect);
        setRatingText("Perfect");
        break;
      default:
        setRatingClass(classes.noRating);
        setRatingText("No Rating");
    }
  }

  return (
    <li
      key={index}
      className={classes.trackListItem}
    >
      <span className={classes.trackNumber}>{track.track_number}.</span>
      <span className={classes.trackName}>{track.name} </span>
      <span className={classes.trackArtists}>{artistNames(track.artists)}</span>
      <span className={classes.trackDuration}>
        {formatMilliseconds(track.duration_ms, "short")}
      </span>
      <span className={`${classes.trackRating} ${ratingClass}`}>
        {ratingText}
      </span>
    </li>
  );
};

export default TrackListItem;

function artistNames(artists) {
  let artistNames = "";
  artists.forEach((artist) => {
    artistNames += artist.name + ", ";
  });
  return artistNames.slice(0, -2);
}
