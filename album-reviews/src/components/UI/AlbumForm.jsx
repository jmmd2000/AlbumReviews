import FormSelect from "./Form/FormSelect";

import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./AlbumForm.module.css";
import { addAlbum, addArtist, getArtistDetail } from "../../firebase/firestore";

const AlbumForm = (props) => {
  const { album, artist } = props;
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  // console.log(artist);

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  function compileRatings() {
    var ratings = [];
    let finalScore = 0;
    let nonSongs = 0;
    var form = document.getElementById("albumForm");
    var elements = form.elements;
    // console.log(elements);
    for (var i = 0, len = elements.length; i < len; ++i) {
      if (elements[i].type === "select-one") {
        console.log(elements[i].value);
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
    // Get the artist and album data and populate the hidden inputs
    document.getElementById("artistData").value = JSON.stringify(artist);
    // console.log(JSON.stringify(artist));
    var modifiedAlbum = JSON.stringify(album);
    // modifiedAlbum = modifiedAlbum.substring(9, modifiedAlbum.length - 1);
    // console.log(modifiedAlbum);
    document.getElementById("albumData").value = modifiedAlbum;
    document.getElementById("durationMS").value = duration;
  }

  // console.log(album);
  const arr = album.tracks.items;
  // console.log(arr);
  const selectGroup = arr.map((track, i) => {
    return (
      <FormSelect
        track={track}
        key={i}
      />
    );
  });
  // console.log(selectGroup);
  return (
    <Form
      method="POST"
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
        />
      </div>
      <h2 className={classes.selectGroupTitle}>Track Ratings</h2>
      <div className={classes.selectGroup}>{selectGroup}</div>
      {/* <button onClick={compileRatings}>Confirm</button> */}
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
          Submit
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

  const parsedRatings = JSON.parse(data.get("ratings"));
  const parsedAlbum = JSON.parse(data.get("albumData"));
  const parsedArtist = JSON.parse(data.get("artistData"));

  console.log(params.albumID);
  const albumData = {
    comment: data.get("comment"),
    ratings: parsedRatings,
    album: parsedAlbum,
    finalRating: data.get("finalRating"),
    durationMS: data.get("durationMS"),
  };

  const artistData = {
    artist: parsedArtist,
  };

  const { responseCodeAlbum, responseMessageAlbum, responseDataAlbum } =
    await addAlbum(albumData);

  // let responseCodeArtist = 200;
  // let responseMessageArtist = "";
  // let responseDataArtist = "";

  const artistExists = await getArtistDetail(parsedArtist.id);
  console.log(artistExists);
  if (artistExists === undefined) {
    const { responseCodeArtist, responseMessageArtist, responseDataArtist } =
      await addArtist(artistData);
  }

  // if (!response.ok) {
  //   throw json({ message: "Could not save album." }, { status: 500 });
  // }
  console.log(responseCodeAlbum);
  console.log(responseMessageAlbum);
  console.log(responseDataAlbum);
  // console.log(responseCodeArtist);
  // console.log(responseMessageArtist);
  // console.log(responseDataArtist);

  // if (responseCodeAlbum !== 200 || responseCodeArtist !== 200) {
  if (responseCodeAlbum !== 200) {
    // throw json(
    //   { message: responseMessageAlbum + " " + responseMessageArtist },
    //   { status: 500 }
    // );
    console.log(responseMessageAlbum);
    // console.log(responseMessageArtist);
  } else {
    // return redirect("/albums");
  }
  return redirect("/albums");
}
