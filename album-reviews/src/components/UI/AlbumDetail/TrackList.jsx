import classes from "./TrackList.module.css";

import TrackListItem from "./TrackListItem";

// This component displays the tracklist of an album along with my ratings for each track.
// It uses the TrackListItem component to display each track.

const TrackList = ({ tracks, ratings }) => {
  return (
    <div className={classes.container}>
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
    </div>
  );
};

export default TrackList;
