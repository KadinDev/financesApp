import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBlchwUF7WDsyiTA0oM8_swvNvLeRdFRFs",
    authDomain: "meuapp-83be9.firebaseapp.com",
    databaseURL: "https://meuapp-83be9-default-rtdb.firebaseio.com",
    projectId: "meuapp-83be9",
    storageBucket: "meuapp-83be9.appspot.com",
    messagingSenderId: "785236189631",
    appId: "1:785236189631:web:4a8341d7a43b57e018410a",
    measurementId: "G-J9KN8FTHWT"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;