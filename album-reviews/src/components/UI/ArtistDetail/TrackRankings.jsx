import TrackRankingSection from "./TrackRankingSection";
import classes from "./TrackRankings.module.css";
import React, { useState } from "react";

// The idea for this component is to have each "Score" have its own tab
// Perfect, Amazing, Great, Good, Meh, Bad, Awful, Non-song
// Each tab will have a list of songs that have that score
// The tabs will be dynamic, if there are no "meh" songs, then the "meh" tab will not be there

const TrackRankings = ({ albumData }) => {
  // console.log(albumData);
  // const aD = JSON.parse(albumData);
  const ratings = [];
  const tracks = [];
  for (let i = 0; i < albumData.length; i++) {
    // albumData.forEach((album) => {
    const list = albumData[i].album.tracks.items;
    // console.log(list);
    for (let j = 0; j < list.length; j++) {
      tracks.push({
        album: albumData[i].album.name,
        albumArt: albumData[i].album.images[1].url,
        id: list[j].id,
        title: list[j].name,
        artists: list[j].artists,
        duration: list[j].duration_ms,
        rating: albumData[i].ratings[j].rating,
      });
    }
  }
  // console.log(tracks);
  const [activeTab, setActiveTab] = useState("");
  const [notActiveClass, setnotActiveClass] = useState();

  // Get unique albums from the tracks
  const albums = [...new Set(tracks.map((track) => track.album))];
  // console.log(albums);

  // Filter tracks based on active tab
  const filteredTracks = tracks.filter((track) => track.rating === activeTab);

  const filteredAlbums = albums
    .filter((album) => filteredTracks.some((track) => track.album === album))
    .map((album) => {
      const trackWithAlbum = filteredTracks.find(
        (track) => track.album === album
      );
      return {
        albumName: album,
        albumArt: trackWithAlbum.albumArt,
      };
    });

  const clickHandler = (rating) => {
    console.log(rating);
    setActiveTab(rating);

    switch (rating) {
      case "0":
        setnotActiveClass(classes.nonSong);
        break;
      case "1":
        setnotActiveClass(classes.awful);
        break;
      case "2":
        setnotActiveClass(classes.bad);
        break;
      case "3":
        setnotActiveClass(classes.meh);
        break;
      case "4":
        setnotActiveClass(classes.good);
        break;
      case "5":
        setnotActiveClass(classes.great);
        break;
      case "6":
        setnotActiveClass(classes.amazing);
        break;
      case "7":
        setnotActiveClass(classes.perfect);
        break;
      default:
        setnotActiveClass(classes.notActive);
    }
  };

  console.log(notActiveClass);
  return (
    <div className={classes.container}>
      <div className={`${classes.tabList} ${notActiveClass}`}>
        {["7", "6", "5", "4", "3", "2", "1", "0"].map(
          (rating) =>
            tracks.some((track) => track.rating === rating) && (
              <button
                key={rating}
                onClick={() => clickHandler(rating)}
                className={`${classes.tabListButton} ${
                  activeTab === rating ? classes.active : notActiveClass
                }`}
              >
                {ratingName(rating)}
              </button>
            )
        )}
      </div>
      {activeTab === "" && (
        <p className={classes.initialMessage}>
          Click one of the ratings to see songs with that rating!
        </p>
      )}
      <TrackRankingSection
        filteredAlbums={filteredAlbums}
        filteredTracks={filteredTracks}
      />
    </div>
  );
};

export default TrackRankings;

function ratingName(x) {
  switch (x) {
    case "0":
      return "Non-song";
    case "1":
      return "Awful";
    case "2":
      return "Bad";
    case "3":
      return "Meh";
    case "4":
      return "Good";
    case "5":
      return "Great";
    case "6":
      return "Amazing";
    case "7":
      return "Perfect";
    default:
      return "Non-song";
  }
}
