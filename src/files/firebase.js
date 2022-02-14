import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB5Nih0pPwS1DcwFrDBOi9-SH7dcTAS4SY",
  authDomain: "realtime-crud-4b55d.firebaseapp.com",
  databaseURL: "https://realtime-crud-4b55d-default-rtdb.firebaseio.com",
  projectId: "realtime-crud-4b55d",
  storageBucket: "realtime-crud-4b55d.appspot.com",
  messagingSenderId: "733206970706",
  appId: "1:733206970706:web:8f43afdafce91e2c937a8b"
});

const db = firebaseApp.database();

export {db};