import classes from "./TrackRankingSection.module.css";

import TrackRankingItem from "./TrackRankingItem";

// This component contains the content for each rating tab in the TrackRankings component.
// It displays a div for each album and a TrackRankingItem for each track in that album that fits the rating tab's criteria.

const TrackRankingSection = ({ filteredAlbums, filteredTracks }) => {
  return (
    <div className={classes.trackList}>
      {filteredAlbums.map((album) => (
        <div
          key={album.albumName}
          className={classes.listContainer}
        >
          <div className={classes.albumContainer}>
            <img
              src={album.albumArt}
              alt={album.albumName}
              className={classes.albumArt}
            />
          </div>

          <ul className={classes.rankGrid}>
            {filteredTracks
              .filter((track) => track.album === album.albumName)
              .map((track) => (
                <TrackRankingItem
                  key={track.id}
                  track={track}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TrackRankingSection;
