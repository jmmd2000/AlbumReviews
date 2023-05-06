import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { process, env } from "dotenv";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// id, condition

export const addAlbum = async (data) => {
  const albumsRef = collection(db, "albums");

  let responseCode = null;
  let responseMessage = null;
  let responseData = null;

  try {
    addDoc(albumsRef, {
      album: data,
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

export const getAccessToken = async () => {
  let accessToken = null;
  // This function is called before any request is made to the Spotify API.
  // It checks if the access token is expired, and if so, it requests a new one.
  // If the access token is not expired, it does nothing.
  const authUrl = "https://accounts.spotify.com/api/token";

  const { clientID, clientSecret } = getApiKeys();

  var authParamaters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      clientID +
      "&client_secret=" +
      clientSecret,
  };

  const tokenFromDB = doc(db, "accessTokens", "token");
  const tokenSnapshot = await getDoc(tokenFromDB);

  if (tokenSnapshot.exists()) {
    // If the token exists, check if it's expired.
    // If it's expired, request a new one and save it to the database.
    const data = tokenSnapshot.data();

    if (data.expiresAt < Date.now()) {
      console.log("token expired");

      const response = await fetch(authUrl, authParamaters);
      const data = await response.json();

      if (response.status !== 200) {
        console.log("Error getting access token");
        return;
      } else {
        await updateDoc(tokenFromDB, {
          token: data.access_token,
          expiresAt: Date.now() + data.expires_in * 1000,
        });

        accessToken = data.access_token;
      }
    } else {
      // If it's not expired, do nothing.
      console.log("token not expired");
      accessToken = data.token;
    }
  } else {
    // If the token doesn't exist, request a new one and save it to the database.
    console.log("No such document!");

    const response = await fetch(authUrl, authParamaters);
    const data = await response.json();

    if (response.status !== 200) {
      console.log("Error getting access token");
      return;
    } else {
      await setDoc(tokenFromDB, {
        token: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000,
      });

      accessToken = data.access_token;
    }
  }

  return accessToken;
};

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
