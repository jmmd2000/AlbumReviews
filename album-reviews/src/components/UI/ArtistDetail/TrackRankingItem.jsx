import classes from "./TrackRankingItem.module.css";

// This component displays a single track in the TrackRankingSection component.
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
