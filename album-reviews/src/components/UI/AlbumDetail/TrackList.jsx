import classes from "./TrackList.module.css";

import TrackListItem from "./TrackListItem";

const TrackList = ({ tracks, ratings }) => {
  console.log(JSON.stringify(ratings[0].rating));
  return (
    <div className={classes.trackListContainer}>
      <h2 className={classes.trackListHeading}>Tracklist</h2>
      <ol className={classes.trackList}>
        {tracks.map((track, index) => (
          <TrackListItem
            track={track}
            index={index}
            rating={JSON.stringify(ratings[index].rating).substring(
              1,
              JSON.stringify(ratings[index].rating).length - 1
            )}
          />
        ))}
      </ol>
    </div>
  );
};

export default TrackList;
