import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASkjEpzLuVAXkGdLXzPzlzjrA96XeNeJo",
  authDomain: "appgestionclientes-a999b.firebaseapp.com",
  projectId: "appgestionclientes-a999b",
  storageBucket: "appgestionclientes-a999b.appspot.com",
  messagingSenderId: "75027280099",
  appId: "1:75027280099:web:bf07308b776c3964aa55d6",
  measurementId: "G-YTKX6D823M"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { db };