import TrackRankingItem from "./TrackRankingItem";
import classes from "./TrackRankingSection.module.css";

const TrackRankingSection = ({ filteredAlbums, filteredTracks }) => {
  console.log(filteredAlbums);
  console.log(filteredTracks);
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
