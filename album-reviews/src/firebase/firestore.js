import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// id, condition

export const addAlbum = async (data) => {
  const albumsRef = collection(db, "albums");

  let responseCode = null;
  let responseMessage = null;
  let responseData = null;

  console.log(data);

  try {
    addDoc(albumsRef, {
      album: data.album,
      // total_tracks: data.album.album.total_tracks,
      // id: data.album.id,
      // name: data.album.album.name,
      // artist: data.album.album.artists,
      // images: data.album.album.images,
      // release_date: data.album.album.release_date,
      comment: data.comment,
      ratings: data.ratings,
      finalRating: data.finalRating,
      durationMS: data.durationMS,
    });
    responseCode = 200;
    responseMessage = "Success";
    responseData = data;
  } catch (error) {
    responseCode = error.code;
    responseMessage = error.message;
    responseData = error.data;
  }

  return { responseCode, responseMessage, responseData };
};

export const getAllAlbums = async () => {
  console.log("getAllAlbums");
  var albums = [];
  const querySnapshot = await getDocs(collection(db, "albums"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    albums.push(doc.data());
  });

  return albums;
};

export const getAlbumDetail = async (id) => {
  console.log("getAlbumDetail");

  const querySnapshot = await getDocs(
    query(collection(db, "albums"), where("album.id", "==", id))
  );

  var docs = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    docs.push(doc.data());
  });
  if (querySnapshot.empty) {
    return null;
  } else {
    return docs[0];
  }
};

export const addArtist = async (data) => {
  const artistsRef = collection(db, "artists");

  let responseCode = null;
  let responseMessage = null;
  let responseData = null;

  console.log(data);

  try {
    addDoc(artistsRef, {
      artist: data.artist,
    });
    responseCode = 200;
    responseMessage = "Success";
    responseData = data;
  } catch (error) {
    responseCode = error.code;
    responseMessage = error.message;
    responseData = error.data;
  }

  return { responseCode, responseMessage, responseData };
};

export const getArtistDetail = async (id) => {
  console.log("getArtistDetail");
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
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    docs.push(doc.data());
  });
  // console.log(albumSnapshot.data());
  // return albumSnapshot.data();
  return docs[0];
};

// This code randomly stopped working overnight without any changes to it.
// Changed to above code and it works again.
// export const getAccessToken = async () => {
//   let accessToken = null;
//   const authUrl = "https://accounts.spotify.com/api/token";
//   const { clientID, clientSecret } = getApiKeys();
//   const authString = `${clientID}:${clientSecret}`;
//   const encodedAuthString = btoa(authString);
//   // const tokenEndpoint = "https://accounts.spotify.com/api/token";
//   const requestBody = "grant_type=client_credentials";
//   const authParamaters = {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${encodedAuthString}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: requestBody,
//   };
//   // This function is called before any request is made to the Spotify API.
//   // It checks if the access token is expired, and if so, it requests a new one.
//   // If the access token is not expired, it does nothing.

//   // var authParamaters = {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/x-www-form-urlencoded",
//   //   },
//   //   body:
//   //     "grant_type=client_credentials&client_id=" +
//   //     clientID +
//   //     "&client_secret=" +
//   //     clientSecret,
//   // };

//   // var authParamaters = {
//   //   headers: {
//   //     Authorization: "Basic " + clientID + ":" + clientSecret,
//   //   },
//   //   form: {
//   //     grant_type: "client_credentials",
//   //   },
//   //   // json: true,
//   // };

//   const tokenFromDB = doc(db, "accessTokens", "token");
//   const tokenSnapshot = await getDoc(tokenFromDB);

//   if (tokenSnapshot.exists()) {
//     // If the token exists, check if it's expired.
//     // If it's expired, request a new one and save it to the database.
//     const data = tokenSnapshot.data();

//     if (data.expiresAt < Date.now()) {
//       console.log("token expired");

//       const response = await fetch(authUrl, authParamaters);
//       const data = await response.json();

//       if (response.status !== 200) {
//         console.log("Error getting access token");
//         accessToken = null;
//       } else {
//         await updateDoc(tokenFromDB, {
//           token: data.access_token,
//           expiresAt: Date.now() + data.expires_in * 1000,
//         });

//         accessToken = data.access_token;
//       }
//     } else {
//       // If it's not expired, do nothing.
//       console.log("token not expired");
//       accessToken = data.token;
//     }
//   } else {
//     // If the token doesn't exist, request a new one and save it to the database.
//     console.log("No such document!");

//     const response = await fetch(authUrl, authParamaters);
//     const data = await response.json();

//     if (response.status !== 200) {
//       console.log("Error getting access token");
//       return;
//     } else {
//       await setDoc(tokenFromDB, {
//         token: data.access_token,
//         expiresAt: Date.now() + data.expires_in * 1000,
//       });

//       accessToken = data.access_token;
//     }
//   }
//   console.log(accessToken);
//   return accessToken;
// };

const getApiKeys = async () => {
  console.log("getApiKeys");

  const docRef = doc(db, "apiKeys", "keys");
  const docSnap = await getDoc(docRef);
  let returnObject;

  if (docSnap.exists()) {
    const data = docSnap.data();
    returnObject = {
      clientID: data.client,
      clientSecret: data.secret,
    };
    console.log("Document data:", data);
  } else {
    console.log("No such document!");
  }

  console.log(returnObject);

  return returnObject;
};
