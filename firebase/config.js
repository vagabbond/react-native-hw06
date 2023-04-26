import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import "firebase/firestore";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArffx9iCuvuDt8BYcNvLkQs6mfY77h0vI",
  authDomain: "driven-reef-377923.firebaseapp.com",
  projectId: "driven-reef-377923",
  storageBucket: "driven-reef-377923.appspot.com",
  messagingSenderId: "458594695048",
  appId: "1:458594695048:web:7dd1e6e86aa6f370556c3d",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const fbStore = getFirestore(app);
