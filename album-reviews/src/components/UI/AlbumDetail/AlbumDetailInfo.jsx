// import { useEffect, useState, useReducer } from "react";

import classes from "./AlbumDetailInfo.module.css";

import useDate from "../../../hooks/use-date";

import ArtistBioRow from "./ArtistBioRow";
import ReviewScore from "./ReviewScore";

const AlbumDetailInfo = ({ albumData }) => {
  const releaseDate = useDate(albumData.album.release_date);

  const album = albumData.album;
  // console.log(albumData.durationMS);

  return (
    <section className={classes.container}>
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
          <ReviewScore
            score={albumData.finalRating}
            onCard={false}
            // className={classes.scorePosition}
          />
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

          {/* <a href={album.external_urls.spotify}>Spotify Link</a> */}
        </div>
      </div>
    </section>
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
