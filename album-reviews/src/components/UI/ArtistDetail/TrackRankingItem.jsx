import classes from "./TrackRankingItem.module.css";

const TrackRankingItem = ({ track }) => {
  return (
    <li
      key={track.id}
      className={classes.rankItem}
    >
      {track.title}
    </li>
  );
};

export default TrackRankingItem;
