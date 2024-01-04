import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, limit, startAfter, getDoc, doc  } from "firebase/firestore";
import { spauloDb } from "./temp/s-paulo-export";
import 'firebase/storage'
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmSAaI3jfoDzEPNhDmxG3qBOe-JuUpiUM",
  authDomain: "spaulo-85d2d.firebaseapp.com",
  projectId: "spaulo-85d2d",
  storageBucket: "spaulo-85d2d.appspot.com",
  messagingSenderId: "645595599441",
  appId: "1:645595599441:web:aa95fc16163a8b02191e70",
  measurementId: "G-HJXXZJH7WC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
const mCollection = collection(db, 'matches');
const playersCollection = collection(db, 'players');
const positionsCollection = collection(db, 'positions');
const promotionsCollection = collection(db, 'promotions');
const teamsCollection = collection(db, 'teams');

const add = async (collectionRef, data) => {
  return addDoc(collectionRef, data);
};

const get = async (collectionRef, ...conditions) => {
  return getDocs(collectionRef, ...conditions);
};

const createQuery = (collectionRef, ...conditions) => {
  return query(collectionRef, ...conditions);
};

const createWhere = (field, operator, value) => {
  return where(field, operator, value);
};

const createLimit = (value) => {
  return limit(value);
}

const After = (value) => {
  return startAfter(value)
}

const getOne = async (collectionRef, ...conditions) => {
  return getDoc(collectionRef, ...conditions);
}

const createDoc = (collectionRef, ...conditions) => {
  return doc(collectionRef, ...conditions)
}

const storage = getStorage(app)

const getRef = (strg, dir) => {
  return ref(strg, dir)
}

/*spauloDb.matches.forEach(async (i) => {
  await addDoc(mCollection, i);
});*/

export { app, analytics, auth, db, mCollection, promotionsCollection, playersCollection, getRef, storage, get, createQuery, createWhere, add, createLimit, After, getOne, createDoc};
