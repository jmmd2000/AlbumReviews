import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// I will DEFINITELY need to refactor this and add error managing later. I'm just trying to get it to work for now.
// And also the main ways it can go wrong are on my end, where I am modifying the data, so I am not too pushed about it.

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add an album

export const addAlbum = async (data) => {
  const albumsRef = collection(db, "albums");

  let responseCode = null;
  let responseMessage = null;
  let responseData = null;

  // try {
  // addDoc(albumsRef, {
  //   album: data.album,
  //   artistID: data.album.artists[0].id,
  //   comment: data.comment,
  //   ratings: data.ratings,
  //   finalRating: data.finalRating,
  //   durationMS: data.durationMS,
  //   postDate: Date.now(),
  // });
  //   responseCode = 200;
  //   responseMessage = "Success";
  //   responseData = data;
  // } catch (error) {
  //   responseCode = error.code;
  //   responseMessage = error.message;
  //   responseData = error.data;
  // }
  await addDoc(albumsRef, {
    album: data.album,
    artistID: data.album.artists[0].id,
    comment: data.comment,
    ratings: data.ratings,
    finalRating: data.finalRating,
    durationMS: data.durationMS,
    postDate: Date.now(),
  });

  await updateArtistScores();

  // await updateArtistRanking(data.album.artists[0].id, "add");
  // const albums = await getAllAlbums();
  // console.log(albums);
  // if (albums.length === 1) {
  //   console.log("create cos length is 1");
  //   await manageArtistLeaderboard("create");
  // } else {
  //   await manageArtistLeaderboard("update");
  // }

  // return { responseCode, responseMessage, responseData };
};

// Delete album where album.id = id
// Also update the artist leaderboard

export const deleteAlbum = async (id, artistID) => {
  const albums = await getAllAlbumsByArtist(artistID);

  if (albums.length === 1) {
    deleteArtist(artistID);
  }

  const querySnapshot = await getDocs(
    query(collection(db, "albums"), where("album.id", "==", id))
  );

  const docRef = doc(db, "albums", querySnapshot.docs[0].id);

  await deleteDoc(docRef);
  await updateArtistScores();
};

// Update the album where album.id = id
// Also update the artist leaderboard

export const updateAlbum = async (id, data) => {
  const querySnapshot = await getDocs(
    query(collection(db, "albums"), where("album.id", "==", id))
  );

  const docRef = doc(db, "albums", querySnapshot.docs[0].id);
  await updateDoc(docRef, {
    album: data.album,
    artistID: data.album.artists[0].id,
    comment: data.comment,
    ratings: data.ratings,
    finalRating: data.finalRating,
    durationMS: data.durationMS,
    postDate: data.postDate,
    // updateDate: Date.now(),
  });

  // await updateArtistRanking(data.album.artists[0].id, "update");
  await updateArtistScores();
};

// Get all albums from the collection, used for grids

export const getAllAlbums = async () => {
  var albums = [];
  const querySnapshot = await getDocs(collection(db, "albums"));
  querySnapshot.forEach((doc) => {
    albums.push(doc.data());
  });

  return albums;
};

// Get the details for a specific album

export const getAlbumDetail = async (id) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "albums"), where("album.id", "==", id))
    );

    var docs = [];
    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    if (querySnapshot.empty) {
      throw new Error("Album not found");
    } else {
      return docs[0];
    }
  } catch (error) {
    throw error;
  }
};

// Get all albums from a specific artist

export const getAllAlbumsByArtist = async (id) => {
  var albums = [];
  const querySnapshot = await getDocs(
    query(collection(db, "albums"), where("artistID", "==", id))
  );
  querySnapshot.forEach((doc) => {
    albums.push(doc.data());
  });

  return albums;
};

// Add an artist to the collection

export const addArtist = async (data) => {
  const artistsRef = collection(db, "artists");

  let responseCode = null;
  let responseMessage = null;
  let responseData = null;

  // try {
  await addDoc(artistsRef, {
    artist: data.artist,
  });

  //   responseCode = 200;
  //   responseMessage = "Success";
  //   responseData = data;
  // } catch (error) {
  //   responseCode = error.code;
  //   responseMessage = error.message;
  //   responseData = error.data;
  // }

  // return { responseCode, responseMessage, responseData };
};

// Delete an artist

export const deleteArtist = async (id) => {
  const querySnapshot = await getDocs(
    query(collection(db, "artists"), where("artist.id", "==", id))
  );

  const docRef = doc(db, "artists", querySnapshot.docs[0].id);
  const artists = await getAllArtists();
  // if (artists.length === 1) {
  //   await manageArtistLeaderboard("delete");
  // }
  await deleteDoc(docRef);
};

// Get the details for a specific artist

export const getArtistDetail = async (id) => {
  // const albumRef = doc(db, "albums", "2MaVmwpatnKBVkWLNrr3");
  // const albumSnapshot = await getDoc(albumRef);
  // console.log(albumSnapshot);
  // const q = query(
  //   collection(db, "albums"),
  //   where("id", "==", "2MaVmwpatnKBVkWLNrr3")
  // );
  const querySnapshot = await getDocs(
    query(collection(db, "artists"), where("artist.id", "==", id))
  );
  // console.log(querySnapshot);
  var docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });
  // console.log(albumSnapshot.data());
  // return albumSnapshot.data();
  return docs[0];
};

// Get all artists from the collection, used for grids
export const getAllArtists = async () => {
  var artists = [];
  const querySnapshot = await getDocs(collection(db, "artists"));
  querySnapshot.forEach((doc) => {
    artists.push(doc.data());
  });

  return artists;
};

// Go thru each artist, get all their albums, calculate the average rating, and update the artist score

export const updateArtistScores = async () => {
  const artists = await getAllArtists();

  for (const artist of artists) {
    const albums = await getAllAlbumsByArtist(artist.artist.id);

    let totalScore = 0;
    for (const album of albums) {
      // parse the finalRating to a number
      let rating = parseInt(album.finalRating);

      totalScore += rating;
    }
    let averageScore = totalScore / albums.length;

    averageScore = Math.round(averageScore);
    // update the artist score
    const querySnapshot = await getDocs(
      query(
        collection(db, "artists"),
        where("artist.id", "==", artist.artist.id)
      )
    );

    const docRef = doc(db, "artists", querySnapshot.docs[0].id);
    await updateDoc(docRef, {
      averageRating: averageScore,
      updateTimestamp: Date.now(),
    });
  }

  // update the leaderboard
  await updateLeaderboard();
};

// Take each artist rating and sort them

export const generateLeaderboard = async () => {
  const artists = await getAllArtists();

  let leaderboard = [];
  artists.forEach((artist) => {
    leaderboard.push({
      artist: artist.artist.name,
      averageRating: artist.averageRating,
    });
  });

  // Sort the leaderboard by average rating
  leaderboard.sort((a, b) => {
    return b.averageRating - a.averageRating;
  });

  return leaderboard;
};

// Update the overall artist leaderboard in the collection

export const updateLeaderboard = async () => {
  // update the artist score
  const querySnapshot = await getDocs(query(collection(db, "leaderboard")));

  if (querySnapshot.docs.length === 0) {
    await addDoc(collection(db, "leaderboard"), {
      leaderboard: await generateLeaderboard(),
      updateTimestamp: Date.now(),
    });
  } else {
    const docRef = doc(db, "leaderboard", querySnapshot.docs[0].id);
    await updateDoc(docRef, {
      leaderboard: await generateLeaderboard(),
      updateTimestamp: Date.now(),
    });
  }
};

// Get the leaderboard, used for displaying the artist ranking on the artist detail page

export const getLeaderboard = async () => {
  const querySnapshot = await getDocs(query(collection(db, "leaderboard")));
  const leaderboard = querySnapshot.docs[0].data().leaderboard;

  return leaderboard;
};

// Get the position in the leaderboard for a specific artist

export const getArtistLeaderboardPosition = async (artistName) => {
  const leaderboard = await getLeaderboard();

  let position = 0;
  for (const artist of leaderboard) {
    position++;
    if (artist.artist === artistName) {
      return position;
    }
  }
  return position;
};
