//Se importan las librerías que se utilizaran para Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

//Aquí va la configuración de Firebase que se conecta con el proyecto creado
const firebaseConfig = {
    apiKey: "AIzaSyCq4t5q3mwPoTNLgadnK1fOSUf4bHina0A",
    authDomain: "crudreactfirebase-cebb5.firebaseapp.com",
    databaseURL: "https://crudreactfirebase-cebb5.firebaseio.com",
    projectId: "crudreactfirebase-cebb5",
    storageBucket: "crudreactfirebase-cebb5.appspot.com",
    messagingSenderId: "771977134450",
    appId: "1:771977134450:web:1e5e4b7bb438a104b79deb"
  };

  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();