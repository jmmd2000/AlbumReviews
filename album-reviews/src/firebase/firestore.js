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

// This code randomly stopped working overnight without any changes to it.
// Changed to above code and it works again.
// export const getAccessToken = async () => {
//   let accessToken = null;
//   // const clientId = "d38ac72e9de745bbb88dabad8bb095c2";
//   // const clientSecret = "b52def9023ea4581a8df9682fd64ae21";
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
