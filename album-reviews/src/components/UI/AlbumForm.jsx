import classes from "./AlbumForm.module.css";

import FormSelect from "./Form/FormSelect";

import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import {
  addAlbum,
  addArtist,
  getArtistDetail,
  updateAlbum,
} from "../../firebase/firestore";

// This component displays the form to add/edit an album review
// It uses the useNavigate hook to navigate to the albums page

const AlbumForm = (props) => {
  let { album, artist, existingAlbum } = props;
  // If the existingAlbum prop is passed, then the form is being used to edit an album
  // So we set the album variable to the existingAlbum data
  if (existingAlbum) {
    album = existingAlbum.album;
  }
  const data = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  function compileRatings() {
    // This function compiles the track ratings from the form into an array of objects
    // First we access each select element and populate the ratings array with the track number and rating
    // Then we add up each tracks duration in ms to be used to calculate the complete runtime of the album
    // We then calculate the final score for the album. It adds up each rating and divides it by the max score (7 * number of songs)
    // Each "non-song" (skit, interlude, etc.) takes one song away from the total number of songs
    // We then set the values of the hidden inputs to the final score, ratings array, and artist data etc. to be sent to the db
    var ratings = [];
    let finalScore = 0;
    let nonSongs = 0;
    var form = document.getElementById("albumForm");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      if (elements[i].type === "select-one") {
        const ratingObj = {
          track_number: elements[i].id,
          rating: elements[i].value,
        };

        if (elements[i].value === "0") {
          nonSongs++;
        }

        finalScore += parseInt(elements[i].value);

        ratings.push(ratingObj);
      }
    }

    let duration = 0;

    for (var i = 0; i < album.tracks.items.length; i++) {
      duration += album.tracks.items[i].duration_ms;
    }

    const maxScore = 7 * (album.tracks.items.length - nonSongs);
    finalScore = Math.round((finalScore / maxScore) * 100);

    document.getElementById("finalRating").value = JSON.stringify(finalScore);
    document.getElementById("ratings").value = JSON.stringify(ratings);
    document.getElementById("artistData").value = JSON.stringify(artist);

    var modifiedAlbum = JSON.stringify(album);
    document.getElementById("albumData").value = modifiedAlbum;
    document.getElementById("durationMS").value = duration;
  }

  // The selectGroup variable is used to display the track rating select elements
  // If the existingAlbum prop is passed, then we need to set the value of the select to the rating for each track
  let selectGroup;
  if (existingAlbum) {
    selectGroup = existingAlbum.album.tracks.items.map((track, i) => {
      // console.log(existingAlbum.ratings[i].rating.toString());
      // console.log(track);
      let score = existingAlbum.ratings[i].rating.toString();
      return (
        <FormSelect
          track={track}
          key={i}
          presetScore={score}
        />
      );
    });
  } else {
    selectGroup = album.tracks.items.map((track, i) => {
      return (
        <FormSelect
          track={track}
          key={i}
        />
      );
    });
  }

  return (
    <Form
      method={existingAlbum ? "PUT" : "POST"}
      className={classes.albumForm}
      id="albumForm"
    >
      <div className={classes.commentContainer}>
        <label
          htmlFor="comment"
          className={classes.commentLabel}
        >
          Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          className={classes.commentInput}
          defaultValue={existingAlbum ? existingAlbum.comment : ""}
        />
      </div>
      <h2 className={classes.selectGroupTitle}>Track Ratings</h2>
      <div className={classes.selectGroup}>{selectGroup}</div>
      <input
        id="ratings"
        name="ratings"
        className={classes.hiddenInput}
      />
      <input
        id="albumData"
        name="albumData"
        className={classes.hiddenInput}
      />
      <input
        id="artistData"
        name="artistData"
        className={classes.hiddenInput}
      />
      <input
        id="finalRating"
        name="finalRating"
        className={classes.hiddenInput}
      />
      <input
        id="durationMS"
        name="durationMS"
        className={classes.hiddenInput}
      />
      <div className={classes.buttonGroup}>
        <button
          type="submit"
          className={classes.submitButton}
          onClick={compileRatings}
        >
          {existingAlbum ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={cancelHandler}
          disabled={isSubmitting}
          className={classes.submitButton}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default AlbumForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  // Get the data from the hidden inputs
  const parsedRatings = JSON.parse(data.get("ratings"));
  const parsedAlbum = JSON.parse(data.get("albumData"));

  // The artist data only needs to be checked if this is a new album review being submitted
  if (method === "POST") {
    const parsedArtist = JSON.parse(data.get("artistData"));
    const artistData = {
      artist: parsedArtist,
    };
    const artistExists = await getArtistDetail(parsedArtist.id);
    if (artistExists === undefined) {
      await addArtist(artistData);
    }
  }

  const albumData = {
    comment: data.get("comment"),
    ratings: parsedRatings,
    album: parsedAlbum,
    finalRating: data.get("finalRating"),
    durationMS: data.get("durationMS"),
    postDate: Date.now(),
  };

  if (method === "PUT") {
    await updateAlbum(params.albumID, albumData);
  } else if (method === "POST") {
    await addAlbum(albumData);
  }

  // Redirect to the albums page when done
  return redirect("/albums");
}
