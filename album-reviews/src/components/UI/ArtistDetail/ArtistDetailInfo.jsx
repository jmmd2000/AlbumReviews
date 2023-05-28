import classes from "./ArtistDetailInfo.module.css";

import ReviewScore from "../AlbumDetail/ReviewScore";
import { getArtistLeaderboardPosition } from "../../../firebase/firestore";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

// This component displays the artist info on the artist detail page.

const ArtistDetailInfo = ({ artistData, albumData }) => {
  const [leaderboardPosition, setLeaderboardPosition] = useState();
  const [podiumClass, setPodiumClass] = useState("");

  useEffect(() => {
    async function getboardPos() {
      const position = await getArtistLeaderboardPosition(
        artistData.artist.name
      );
      setLeaderboardPosition(position);
      if (position === 1) {
        setPodiumClass(classes.gold);
      } else if (position === 2) {
        setPodiumClass(classes.silver);
      } else if (position === 3) {
        setPodiumClass(classes.bronze);
      }
    }
    getboardPos();
  }, [artistData.artist.name]);

  console.log(albumData);
  const numAlbums =
    albumData.length === 1
      ? albumData.length + " album"
      : albumData.length + " albums";

  return (
    <div className={classes.container}>
      <div className={classes.artistDetailHeader}>
        <img
          src={artistData.artist.images[1].url}
          alt={artistData.artist.name}
          className={classes.artistImage}
        />
        <div className={classes.infoDiv}>
          <h1 className={classes.artistName}>{artistData.artist.name}</h1>
          {console.log(artistData)}
          <div className={classes.flexRow}></div>
          <div className={classes.albumDescription}>
            <p className={classes.albumStatTitle}># of albums reviewed</p>
            <p className={classes.albumStatTitle}>Followers</p>
            <p className={classes.albumStatTitle}>Personal Ranking</p>

            <p className={classes.albumStat}>{numAlbums}</p>
            <p className={classes.albumStat}>
              {artistData.artist.followers.total.toLocaleString()}
            </p>
            <p className={classes.albumStat}>
              <span className={podiumClass}>
                {leaderboardPosition !== undefined ? (
                  "#" + leaderboardPosition
                ) : (
                  <Skeleton
                    width={230}
                    height={40}
                    variant="rectangular"
                    animation="wave"
                  />
                )}
              </span>
            </p>
          </div>
        </div>

        <ReviewScore
          score={artistData.averageRating}
          onCard={false}
          style={classes.scorePosition}
        />
      </div>
    </div>
  );
};

export default ArtistDetailInfo;
